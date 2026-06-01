import { Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";

import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MyEnrollments from "../pages/MyEnrollments";

import CourseLearn from "../pages/student/CourseLearn";
import Dashboard from "../pages/student/Dashboard";
import MyCertificates from "../pages/student/MyCertificates";
import QuizPage from "../pages/student/QuizPage";
import QuizResult from "../pages/student/QuizResult";

import AdminDashboard from "../pages/admin/Dashboard";
import CoursesAdmin from "../pages/admin/CoursesAdmin";
import CreateCourse from "../pages/admin/CreateCourse";
import EditCourse from "../pages/admin/EditCourse";
import LessonsAdmin from "../pages/admin/LessonsAdmin";
import CreateLesson from "../pages/admin/CreateLesson";
import EditLesson from "../pages/admin/EditLesson";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route path="/my-enrollments" element={<MyEnrollments />} />
      <Route path="/learn/:courseId" element={<CourseLearn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-certificates" element={<MyCertificates />} />
      <Route path="/quiz/:slug" element={<QuizPage />} />
      <Route path="/quiz-result" element={<QuizResult />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <AdminRoute>
            <CoursesAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses/create"
        element={
          <AdminRoute>
            <CreateCourse />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses/edit/:id"
        element={
          <AdminRoute>
            <EditCourse />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses/:courseId/lessons"
        element={
          <AdminRoute>
            <LessonsAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/courses/:courseId/lessons/create"
        element={
          <AdminRoute>
            <CreateLesson />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/lessons/edit/:id"
        element={
          <AdminRoute>
            <EditLesson />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
