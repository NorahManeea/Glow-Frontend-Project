import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
)
