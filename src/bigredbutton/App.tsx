import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

type AppState = 'INITIAL' | 'COUNTDOWN' | 'EXPLOSION' | 'RESET';

export default function App() {
  const [appState, setAppState] = useState<AppState>('INITIAL');
  const [countdown, setCountdown] = useState(3);

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const explosionScale = useRef(new Animated.Value(0)).current;
  const explosionOpacity = useRef(new Animated.Value(0)).current;
  const particleAnimations = useRef(
    Array.from({ length: 8 }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const handleButtonPress = () => {
    if (appState === 'INITIAL') {
      // Animate button press
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setAppState('COUNTDOWN');
      setCountdown(3);
    } else if (appState === 'EXPLOSION') {
      resetApp();
    }
  };

  const resetApp = () => {
    setAppState('INITIAL');
    setCountdown(3);

    // Reset all animations
    buttonScale.setValue(1);
    explosionScale.setValue(0);
    explosionOpacity.setValue(0);
    particleAnimations.forEach(particle => {
      particle.translateX.setValue(0);
      particle.translateY.setValue(0);
      particle.opacity.setValue(0);
    });
  };

  // Countdown effect
  useEffect(() => {
    if (appState === 'COUNTDOWN' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (appState === 'COUNTDOWN' && countdown === 0) {
      setAppState('EXPLOSION');
      startExplosionAnimation();
    }
  }, [appState, countdown]);

  const startExplosionAnimation = () => {
    // Main explosion animation
    Animated.parallel([
      Animated.timing(explosionScale, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(explosionOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(explosionOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Particle animations
    particleAnimations.forEach((particle, index) => {
      const angle = (index * 45) * (Math.PI / 180); // 45 degrees apart
      const distance = 150;

      Animated.parallel([
        Animated.timing(particle.translateX, {
          toValue: Math.cos(angle) * distance,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(particle.translateY, {
          toValue: Math.sin(angle) * distance,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(particle.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  };

  const renderInitialState = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Big Red Button</Text>
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.bigRedButton}
          onPress={handleButtonPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>PRESS ME!</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.subtitle}>Dare to press the button?</Text>
    </View>
  );

  const renderCountdownState = () => (
    <View style={styles.container}>
      <Text style={styles.countdownText}>{countdown}</Text>
      <Text style={styles.countdownLabel}>
        {countdown === 1 ? 'BOOM!' : 'Get ready...'}
      </Text>
    </View>
  );

  const renderExplosionState = () => (
    <View style={styles.explosionContainer}>
      {/* Main explosion effect */}
      <Animated.View
        style={[
          styles.explosion,
          {
            transform: [{ scale: explosionScale }],
            opacity: explosionOpacity,
          },
        ]}
      />

      {/* Particle effects */}
      {particleAnimations.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: particle.translateX },
                { translateY: particle.translateY },
              ],
              opacity: particle.opacity,
            },
          ]}
        />
      ))}

      <Text style={styles.explosionText}>💥 BOOM! 💥</Text>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleButtonPress}
      >
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.fullScreen}>
      {appState === 'INITIAL' && renderInitialState()}
      {appState === 'COUNTDOWN' && renderCountdownState()}
      {appState === 'EXPLOSION' && renderExplosionState()}
      <StatusBar style="light" />
    </View>
  );
}

// Screen dimensions available if needed
// const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 30,
    textAlign: 'center',
  },
  bigRedButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#ff0000',
    textAlign: 'center',
  },
  countdownLabel: {
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  explosionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  explosion: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff4500',
    shadowColor: '#ff4500',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  particle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffa500',
  },
  explosionText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
  },
  resetButton: {
    marginTop: 50,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#333',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
