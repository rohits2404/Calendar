import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CalendarPage from './pages/CalendarPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<CalendarPage/>} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
