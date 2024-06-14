import App from '../App.js'
import { store } from '../store/index';
import { Provider } from 'react-redux';

export default function Index() {
  return (
    <Provider store = {store}>
    <App />
    </Provider>
  );
}


