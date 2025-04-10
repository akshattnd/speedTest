
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

export default function Layout() {
  return (
    <div className='flex flex-col min-h-svh min-w-svw ' >
      <Header />
      <main className='flex-1 flex min-h-0'>
        <Outlet />
      </main>
      <Footer />
    </div>

  )
}
