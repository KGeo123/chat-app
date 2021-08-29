import { AuthProvider } from 'store/authContext';
import '../styles/global.css';
import messagesStore from 'redux/store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={messagesStore}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
