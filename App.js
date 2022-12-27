import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Navigation from './src/Navigation';

export default function App() {
  return (
    <BottomSheetModalProvider>
      <Navigation />
    </BottomSheetModalProvider>
  );
}

