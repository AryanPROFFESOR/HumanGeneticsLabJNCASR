// ============================================
// HMG LAB WEBSITE - TSPARTICLES CONFIGURATION
// Interactive 3D DNA-inspired network background for Hero Section
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize tsParticles only if on home page hero section
  const tsparticlesContainer = document.getElementById('tsparticles');
  
  if (tsparticlesContainer) {
    console.log('Initializing tsParticles for hero section...');
    
    tsParticles.load("tsparticles", {
      background: {
        color: {
          value: "transparent"
        }
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          },
          onHover: {
            enable: true,
            mode: "grab"
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.8,
              color: "#D4A574"
            }
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: ["#8B4513", "#D4A574", "#ffffff"]
        },
        links: {
          color: "#8B4513",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
          triangles: {
            enable: true,
            color: "#D4A574",
            opacity: 0.05
          }
        },
        collisions: {
          enable: false
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: true,
          speed: 1,
          straight: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 80
        },
        opacity: {
          value: 0.5,
          random: true,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        shape: {
          type: ["circle", "triangle"]
        },
        size: {
          value: { min: 1, max: 5 },
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.3,
            sync: false
          }
        }
      },
      detectRetina: true
    }).then(container => {
      console.log('tsParticles loaded successfully!');
    }).catch(error => {
      console.error('tsParticles failed to load:', error);
    });
  }
});