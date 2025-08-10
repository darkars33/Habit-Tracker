import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMount, setIsMount] = useState<boolean>(false);
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    const isAuthGroup = segments[0] === "auth";
    if (isMount && !user && !isAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && isAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
