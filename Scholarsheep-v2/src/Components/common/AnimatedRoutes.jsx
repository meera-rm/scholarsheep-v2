import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';

// PAGES
import FourOFour from '../../Pages/FourOFour';
import Home from '../../Pages/Home';
import About from '../../Pages/About/About';
import Contact from '../../Pages/Contact';
import BookCardList from '../books/booksCardList/BookCardList';
import NewBooks from '../../Pages/Books/NewBook';
import ShowBooks from '../../Pages/Books/ShowBooks';
import EditBooks from '../../Pages/Books/EditBooks';
import Dictionary from '../tools/Dictionary/Dictionary';
import FlashCard from '../tools/FlashCard/FlashCard';
import AddVocab from '../tools/Vocabulary/AddVocab';
import Timer from '../pomodoro/MyTimer';

import Games from '../games/AllGames/Games';
import RockpaperScissor from '../games/rps/RockpaperScissor';
import EtchSketch from '../temp/EtchSketch';
import MemoryGame from '../games/memorygame/MemoryGame';
import PaintApp from '../games/paintApp/PaintApp';
import GuessWord from '../games/guessword/GuessWord';
import TicTacToe from '../temp/TicTacToe';
import CasualReading from '../books/bookCard/CasualReading';
import ReadingLevelBooks from '../books/bookCard/ReadingLevelBooks';

import TeacherIndex from '../../Pages/Teacher/TeacherIndex';
import TeacherNew from '../../Pages/Teacher/TeacherNew';
import TeacherShow from '../../Pages/Teacher/TeacherShow';
import TeacherEdit from '../../Pages/Teacher/TeacherEdit';

import StudentIndex from '../../Pages/Student/StudentIndex';
import StudentNew from '../../Pages/Student/StudentNew';
import StudentShow from '../../Pages/Student/StudentShow';
import StudentEdit from '../../Pages/Student/StudentEdit';

import AddSubscription from '../subscriptions/AddSubscription';
import ListSubscription from '../subscriptions/ListSubscription';
import EditEmailModal from '../subscriptions/EditEmailModal';

import PrivacyPolicy from '../../Pages/PrivacyPolicy';
import ParentDashboard from '../../Pages/ParentDashboard';

import Notes from '../note/Notes';
import NewNotes from '../note/NewNotes';
import UpdateNotes from '../note/UpdateNotes';
import ShowNotes from '../note/ShowNotes';
import NotesHome from '../note/NotesHome';

import IndexComments from '../../Pages/Comment/IndexComments';
import NewComment from '../../Pages/Comment/NewComment';
import ShowComments from '../../Pages/Comment/ShowComments';
import EditComments from '../../Pages/Comment/EditComments';

// New auth pages
import Login from '../../Pages/Login.jsx';
import Register from '../../Pages/Register.jsx';
import Unauthorized from '../../Pages/Unauthorized.jsx';
import TeacherDashboard from '../../Pages/TeacherDashboard.jsx';
import StudentDashboard from '../../Pages/StudentDashboard.jsx';

// Reading Log & Stats pages
import MyBooks from '../../Pages/ReadingLog/MyBooks.jsx';
import AddBook from '../../Pages/ReadingLog/AddBook.jsx';
import BookProgress from '../../Pages/ReadingLog/BookProgress.jsx';
import MyStats from '../../Pages/Stats/MyStats.jsx';
import MyStickerCase from '../../Pages/Awards/MyStickerCase.jsx';

// Leaderboard, Book Clubs
import ClassLeaderboard from '../../Pages/Leaderboard/ClassLeaderboard.jsx';
import MyBookClubs from '../../Pages/BookClubs/MyBookClubs.jsx';
import BookClubDetail from '../../Pages/BookClubs/BookClubDetail.jsx';
import CreateBookClub from '../../Pages/BookClubs/CreateBookClub.jsx';
import ReadingPartners from '../../Pages/BookClubs/ReadingPartners.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <main>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            {/* ===== PUBLIC ROUTES ===== */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/policy' element={<PrivacyPolicy />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/dictionary' element={<Dictionary />} />
            <Route path='/flashcard' element={<FlashCard />} />
            <Route path='/vocabulary' element={<AddVocab />} />
            <Route path='/timer' element={<Timer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

            {/* Books — browsing is public */}
            <Route path='/books'>
              <Route index element={<BookCardList />} />
              <Route path=':id' element={<ShowBooks />} />
              <Route path='level' element={<ReadingLevelBooks />} />
              <Route path='casual' element={<CasualReading />} />
              {/* Creating/editing books — teacher only */}
              <Route path='new' element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <NewBooks />
                </ProtectedRoute>
              } />
              <Route path=':id/edit' element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <EditBooks />
                </ProtectedRoute>
              } />
            </Route>

            {/* Games — public */}
            <Route path='/games'>
              <Route index element={<Games />} />
              <Route path='rps' element={<RockpaperScissor />} />
              <Route path='memorygame' element={<MemoryGame />} />
              <Route path='paint' element={<PaintApp />} />
              <Route path='guessword' element={<GuessWord />} />
              <Route path='etchsketch' element={<EtchSketch />} />
              <Route path='tictactoe' element={<TicTacToe />} />
            </Route>

            {/* ===== AUTHENTICATED ROUTES (any role) ===== */}
            <Route path='/subscriptions'>
              <Route index element={<ProtectedRoute><ListSubscription /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><AddSubscription /></ProtectedRoute>} />
              <Route path=':id/edit' element={<ProtectedRoute><EditEmailModal /></ProtectedRoute>} />
            </Route>

            <Route path='/comments'>
              <Route index element={<ProtectedRoute><IndexComments /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewComment /></ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute><ShowComments /></ProtectedRoute>} />
              <Route path=':id/edit' element={<ProtectedRoute><EditComments /></ProtectedRoute>} />
            </Route>

            <Route path='/notes'>
              <Route index element={<ProtectedRoute><Notes /></ProtectedRoute>} />
              <Route path='home' element={<ProtectedRoute><NotesHome /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewNotes /></ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute><ShowNotes /></ProtectedRoute>} />
              <Route path=':id/edit' element={<ProtectedRoute><UpdateNotes /></ProtectedRoute>} />
            </Route>

            {/* ===== ADMIN-ONLY ROUTES (manage all teachers) ===== */}
            <Route path='/teachers'>
              <Route index element={<ProtectedRoute allowedRoles={['admin']}><TeacherIndex /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute allowedRoles={['admin']}><TeacherNew /></ProtectedRoute>} />
              <Route path=':id/edit' element={<ProtectedRoute allowedRoles={['admin']}><TeacherEdit /></ProtectedRoute>} />
              {/* Teachers can view their own profile */}
              <Route path=':id' element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherShow /></ProtectedRoute>} />
            </Route>

            <Route path='/students'>
              <Route index element={<ProtectedRoute allowedRoles={['teacher']}><StudentIndex /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute allowedRoles={['teacher']}><StudentNew /></ProtectedRoute>} />
              <Route path=':id' element={<ProtectedRoute allowedRoles={['teacher']}><StudentShow /></ProtectedRoute>} />
              <Route path=':id/edit' element={<ProtectedRoute allowedRoles={['teacher']}><StudentEdit /></ProtectedRoute>} />
            </Route>

            <Route path='/teacher-dashboard' element={
              <ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>
            } />

            {/* ===== PARENT-ONLY ROUTES ===== */}
            <Route path='/parent-dashboard' element={
              <ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>
            } />

            {/* ===== STUDENT-ONLY ROUTES ===== */}
            <Route path='/student-dashboard' element={
              <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>
            } />

            {/* ===== READING LOG ROUTES (any authenticated user) ===== */}
            <Route path='/my-books' element={
              <ProtectedRoute><MyBooks /></ProtectedRoute>
            } />
            <Route path='/my-books/add' element={
              <ProtectedRoute><AddBook /></ProtectedRoute>
            } />
            <Route path='/my-books/:id' element={
              <ProtectedRoute><BookProgress /></ProtectedRoute>
            } />
            <Route path='/my-stats' element={
              <ProtectedRoute><MyStats /></ProtectedRoute>
            } />
            <Route path='/my-stickers' element={
              <ProtectedRoute><MyStickerCase /></ProtectedRoute>
            } />

            {/* ===== LEADERBOARD & BOOK CLUBS ===== */}
            <Route path='/leaderboard' element={
              <ProtectedRoute><ClassLeaderboard /></ProtectedRoute>
            } />
            <Route path='/book-clubs' element={
              <ProtectedRoute><MyBookClubs /></ProtectedRoute>
            } />
            <Route path='/book-clubs/create' element={
              <ProtectedRoute><CreateBookClub /></ProtectedRoute>
            } />
            <Route path='/book-clubs/:id' element={
              <ProtectedRoute><BookClubDetail /></ProtectedRoute>
            } />
            <Route path='/reading-partners' element={
              <ProtectedRoute><ReadingPartners /></ProtectedRoute>
            } />

            {/* 404 */}
            <Route path='*' element={<FourOFour />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AnimatedRoutes;
