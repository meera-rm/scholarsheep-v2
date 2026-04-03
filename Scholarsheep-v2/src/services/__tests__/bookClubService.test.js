import { describe, it, expect, beforeEach } from 'vitest';
import {
  createClub, getAllClubs, getClubById, joinClub,
  leaveClub, addPost, getClubPosts, deletePost,
} from '../bookClubLocal';

beforeEach(() => {
  localStorage.clear();
});

describe('Book Club Service', () => {
  describe('createClub', () => {
    it('creates a club with invite code', () => {
      const club = createClub({ name: 'Test Club', createdBy: 'teacher' });
      expect(club.name).toBe('Test Club');
      expect(club.inviteCode).toHaveLength(6);
      expect(club.members).toHaveLength(1);
      expect(club.members[0].role).toBe('leader');
    });
  });

  describe('joinClub', () => {
    it('joins with valid invite code', () => {
      const club = createClub({ name: 'Club', createdBy: 'teacher' });
      const result = joinClub(club.inviteCode, 'student1');
      expect(result.members).toHaveLength(2);
    });

    it('rejects invalid invite code', () => {
      const result = joinClub('INVALID', 'student1');
      expect(result.error).toBe('Invalid invite code');
    });

    it('rejects duplicate member', () => {
      const club = createClub({ name: 'Club', createdBy: 'teacher' });
      joinClub(club.inviteCode, 'student1');
      const result = joinClub(club.inviteCode, 'student1');
      expect(result.error).toBe('Already a member');
    });
  });

  describe('leaveClub', () => {
    it('removes member from club', () => {
      const club = createClub({ name: 'Club', createdBy: 'teacher' });
      joinClub(club.inviteCode, 'student1');
      leaveClub(club.id, 'student1');
      const updated = getClubById(club.id);
      expect(updated.members).toHaveLength(1);
    });
  });

  describe('discussion posts', () => {
    it('adds and retrieves posts', () => {
      const club = createClub({ name: 'Club', createdBy: 'teacher' });
      addPost({ clubId: club.id, username: 'student1', content: 'Great book!' });
      addPost({ clubId: club.id, username: 'teacher', content: 'I agree!' });
      const posts = getClubPosts(club.id);
      expect(posts).toHaveLength(2);
    });

    it('deletes a post', () => {
      const club = createClub({ name: 'Club', createdBy: 'teacher' });
      const post = addPost({ clubId: club.id, username: 'student1', content: 'Test' });
      deletePost(post.id);
      expect(getClubPosts(club.id)).toHaveLength(0);
    });
  });
});
