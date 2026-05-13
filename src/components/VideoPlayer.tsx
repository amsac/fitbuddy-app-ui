import { ResizeMode, Video } from 'expo-av';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export function VideoPlayer({ uri }: { uri?: string }) {
  const theme = useTheme();
  if (!uri) return null;
  return (
    <Video
      source={{ uri }}
      style={[styles.video, { borderRadius: theme.radius.md }]}
      resizeMode={ResizeMode.CONTAIN}
      shouldPlay
      isLooping
      isMuted
      useNativeControls={false}
    />
  );
}

const styles = StyleSheet.create({ video: { width: '100%', height: 230, backgroundColor: '#000', overflow: 'hidden' } });
