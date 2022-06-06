import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'react'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/Navbar'
import Root from 'components/Root'

const NotFound = lazy(() => import('pages/NotFound'))
const Landing = lazy(() => import('pages/Landing'))
const App = lazy(() => import('pages/App'))

export default function () {
  return (
    <Root>
      <Router>
        <Navbar />
        <ToastContainer position="bottom-right" theme="dark" />
        <Routes>
          <Route
            path="/"
            element={<LazyComponent lazyImported={<Landing />} />}
          />
          <Route
            path="/app"
            element={<LazyComponent lazyImported={<App />} />}
          />
          <Route
            path="*"
            element={<LazyComponent lazyImported={<NotFound />} />}
          />
        </Routes>
      </Router>
    </Root>
  )
}
