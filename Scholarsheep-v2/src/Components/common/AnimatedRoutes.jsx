import React, { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';

// PAGES
import Home from '../../Pages/Home';
const FourOFour = lazy(() => import('../../Pages/FourOFour'));
const About = lazy(() => import('../../Pages/About/About'));
const Contact = lazy(() => import('../../Pages/Contact'));
const BookCardList = lazy(() => import('../books/booksCardList/BookCardList'));
const NewBooks = lazy(() => import('../../Pages/Books/NewBook'));
const ShowBooks = lazy(() => import('../../Pages/Books/ShowBooks'));
const EditBooks = lazy(() => import('../../Pages/Books/EditBooks'));
const Dictionary = lazy(() => import('../tools/Dictionary/Dictionary'));
const FlashCard = lazy(() => import('../tools/FlashCard/FlashCard'));
const AddVocab = lazy(() => import('../tools/Vocabulary/AddVocab'));
const Timer = lazy(() => import('../pomodoro/MyTimer'));

const Games = lazy(() => import('../games/AllGames/Games'));
const RockpaperScissor = lazy(() => import('../games/rps/RockpaperScissor'));
const EtchSketch = lazy(() => import('../temp/EtchSketch'));
const MemoryGame = lazy(() => import('../games/memorygame/MemoryGame'));
const PaintApp = lazy(() => import('../games/paintApp/PaintApp'));
const GuessWord = lazy(() => import('../games/guessword/GuessWord'));
const TicTacToe = lazy(() => import('../temp/TicTacToe'));
const CasualReading = lazy(() => import('../books/bookCard/CasualReading'));
const ReadingLevelBooks = lazy(() => import('../books/bookCard/ReadingLevelBooks'));

const TeacherIndex = lazy(() => import('../../Pages/Teacher/TeacherIndex'));
const TeacherNew = lazy(() => import('../../Pages/Teacher/TeacherNew'));
const TeacherShow = lazy(() => import('../../Pages/Teacher/TeacherShow'));
const TeacherEdit = lazy(() => import('../../Pages/Teacher/TeacherEdit'));

const StudentIndex = lazy(() => import('../../Pages/Student/StudentIndex'));
const StudentNew = lazy(() => import('../../Pages/Student/StudentNew'));
const StudentShow = lazy(() => import('../../Pages/Student/StudentShow'));
const StudentEdit = lazy(() => import('../../Pages/Student/StudentEdit'));

const AddSubscription = lazy(() => import('../subscriptions/AddSubscription'));
const ListSubscription = lazy(() => import('../subscriptions/ListSubscription'));
const EditEmailModal = lazy(() => import('../subscriptions/EditEmailModal'));

const PrivacyPolicy = lazy(() => import('../../Pages/PrivacyPolicy'));
const ParentDashboard = lazy(() => import('../../Pages/ParentDashboard'));

const Notes = lazy(() => import('../note/Notes'));
const NewNotes = lazy(() => import('../note/NewNotes'));
const UpdateNotes = lazy(() => import('../note/UpdateNotes'));
const ShowNotes = lazy(() => import('../note/ShowNotes'));
const NotesHome = lazy(() => import('../note/NotesHome'));

const IndexComments = lazy(() => import('../../Pages/Comment/IndexComments'));
const NewComment = lazy(() => import('../../Pages/Comment/NewComment'));
const ShowComments = lazy(() => import('../../Pages/Comment/ShowComments'));
const EditComments = lazy(() => import('../../Pages/Comment/EditComments'));

// New auth pages
const Login = lazy(() => import('../../Pages/Login.jsx'));
const Register = lazy(() => import('../../Pages/Register.jsx'));
const Unauthorized = lazy(() => import('../../Pages/Unauthorized.jsx'));
const TeacherDashboard = lazy(() => import('../../Pages/TeacherDashboard.jsx'));
const StudentDashboard = lazy(() => import('../../Pages/StudentDashboard.jsx'));

// Reading Log & Stats pages
const MyBooks = lazy(() => import('../../Pages/ReadingLog/MyBooks.jsx'));
const AddBook = lazy(() => import('../../Pages/ReadingLog/AddBook.jsx'));
const BookProgress = lazy(() => import('../../Pages/ReadingLog/BookProgress.jsx'));
const MyStats = lazy(() => import('../../Pages/Stats/MyStats.jsx'));
const MyStickerCase = lazy(() => import('../../Pages/Awards/MyStickerCase.jsx'));

// Leaderboard, Book Clubs
const ClassLeaderboard = lazy(() => import('../../Pages/Leaderboard/ClassLeaderboard.jsx'));
const MyBookClubs = lazy(() => import('../../Pages/BookClubs/MyBookClubs.jsx'));
const BookClubDetail = lazy(() => import('../../Pages/BookClubs/BookClubDetail.jsx'));
const CreateBookClub = lazy(() => import('../../Pages/BookClubs/CreateBookClub.jsx'));
const ReadingPartners = lazy(() => import('../../Pages/BookClubs/ReadingPartners.jsx'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <main>
        <AnimatePresence>
          <Suspense fallback={null}>
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
          </Suspense>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AnimatedRoutes;
