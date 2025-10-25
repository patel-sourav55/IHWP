// Pure Wellness - Practices Functionality

class PracticeTimer {
    constructor() {
        this.timers = {
            meditation: {
                element: document.getElementById('meditation-timer'),
                display: document.getElementById('meditation-display'),
                startBtn: document.getElementById('meditation-start'),
                pauseBtn: document.getElementById('meditation-pause'),
                resetBtn: document.getElementById('meditation-reset'),
                duration: 5 * 60, // 5 minutes in seconds
                remaining: 5 * 60,
                interval: null,
                isRunning: false
            },
            yoga: {
                element: document.getElementById('yoga-timer'),
                display: document.getElementById('yoga-display'),
                poseDisplay: document.getElementById('yoga-pose'),
                startBtn: document.getElementById('yoga-start'),
                pauseBtn: document.getElementById('yoga-pause'),
                resetBtn: document.getElementById('yoga-reset'),
                duration: 0,
                remaining: 0,
                interval: null,
                isRunning: false,
                currentPose: 0,
                poses: [
                    { name: 'Mountain Pose', duration: 30 },
                    { name: 'Forward Fold', duration: 30 },
                    { name: 'Downward Dog', duration: 45 },
                    { name: 'Child\'s Pose', duration: 30 },
                    { name: 'Cat-Cow', duration: 60 }
                ]
            },
            stretch: {
                element: document.getElementById('stretch-timer'),
                display: document.getElementById('stretch-display'),
                poseDisplay: document.getElementById('stretch-pose'),
                startBtn: document.getElementById('stretch-start'),
                pauseBtn: document.getElementById('stretch-pause'),
                resetBtn: document.getElementById('stretch-reset'),
                duration: 0,
                remaining: 0,
                interval: null,
                isRunning: false,
                currentPose: 0,
                poses: [
                    { name: 'Neck Stretch', duration: 30 },
                    { name: 'Shoulder Rolls', duration: 30 },
                    { name: 'Spinal Twist', duration: 45 },
                    { name: 'Hip Stretch', duration: 45 },
                    { name: 'Leg Stretch', duration: 60 }
                ]
            }
        };
        
        this.breathingExercises = {
            '478': {
                element: document.getElementById('breathing-exercise'),
                circle: document.getElementById('breathing-circle'),
                phaseDisplay: document.getElementById('breathing-phase'),
                startBtn: document.getElementById('breathing-start'),
                stopBtn: document.getElementById('breathing-stop'),
                interval: null,
                isRunning: false,
                phase: 'inhale',
                count: 0,
                phases: [
                    { name: 'Inhale', duration: 4, instruction: 'Inhale for 4' },
                    { name: 'Hold', duration: 7, instruction: 'Hold for 7' },
                    { name: 'Exhale', duration: 8, instruction: 'Exhale for 8' }
                ]
            },
            'box': {
                element: document.getElementById('box-breathing'),
                visual: document.getElementById('box-breathing-visual'),
                fill: document.getElementById('box-fill'),
                text: document.getElementById('box-text'),
                phaseDisplay: document.getElementById('box-phase'),
                startBtn: document.getElementById('box-start'),
                stopBtn: document.getElementById('box-stop'),
                interval: null,
                isRunning: false,
                phase: 'inhale',
                count: 0,
                phases: [
                    { name: 'Inhale', duration: 4, instruction: 'Inhale for 4' },
                    { name: 'Hold In', duration: 4, instruction: 'Hold for 4' },
                    { name: 'Exhale', duration: 4, instruction: 'Exhale for 4' },
                    { name: 'Hold Out', duration: 4, instruction: 'Hold empty for 4' }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.bindMeditationEvents();
        this.bindBreathingEvents();
        this.bindYogaEvents();
        this.bindStretchEvents();
        this.loadProgress();
    }

    bindMeditationEvents() {
        const timer = this.timers.meditation;
        
        // Duration buttons
        document.getElementById('meditation-5min').addEventListener('click', () => this.setMeditationDuration(5));
        document.getElementById('meditation-10min').addEventListener('click', () => this.setMeditationDuration(10));
        document.getElementById('meditation-15min').addEventListener('click', () => this.setMeditationDuration(15));
        document.getElementById('meditation-20min').addEventListener('click', () => this.setMeditationDuration(20));
        
        // Control buttons
        timer.startBtn.addEventListener('click', () => this.startMeditation());
        timer.pauseBtn.addEventListener('click', () => this.pauseMeditation());
        timer.resetBtn.addEventListener('click', () => this.resetMeditation());
    }

    bindBreathingEvents() {
        // 4-7-8 Breathing
        this.breathingExercises['478'].startBtn.addEventListener('click', () => this.startBreathing('478'));
        this.breathingExercises['478'].stopBtn.addEventListener('click', () => this.stopBreathing('478'));
        
        // Box Breathing
        this.breathingExercises['box'].startBtn.addEventListener('click', () => this.startBreathing('box'));
        this.breathingExercises['box'].stopBtn.addEventListener('click', () => this.stopBreathing('box'));
    }

    bindYogaEvents() {
        const timer = this.timers.yoga;
        timer.startBtn.addEventListener('click', () => this.startYoga());
        timer.pauseBtn.addEventListener('click', () => this.pauseYoga());
        timer.resetBtn.addEventListener('click', () => this.resetYoga());
    }

    bindStretchEvents() {
        const timer = this.timers.stretch;
        timer.startBtn.addEventListener('click', () => this.startStretch());
        timer.pauseBtn.addEventListener('click', () => this.pauseStretch());
        timer.resetBtn.addEventListener('click', () => this.resetStretch());
    }

    setMeditationDuration(minutes) {
        const timer = this.timers.meditation;
        timer.duration = minutes * 60;
        timer.remaining = minutes * 60;
        this.updateMeditationDisplay();
    }

    startMeditation() {
        const timer = this.timers.meditation;
        if (!timer.isRunning) {
            timer.isRunning = true;
            timer.startBtn.disabled = true;
            timer.pauseBtn.disabled = false;
            
            timer.interval = setInterval(() => {
                timer.remaining--;
                this.updateMeditationDisplay();
                
                if (timer.remaining <= 0) {
                    this.completeMeditation();
                }
            }, 1000);
            
            this.saveProgress();
        }
    }

    pauseMeditation() {
        const timer = this.timers.meditation;
        if (timer.isRunning) {
            timer.isRunning = false;
            clearInterval(timer.interval);
            timer.startBtn.disabled = false;
            timer.pauseBtn.disabled = true;
        }
    }

    resetMeditation() {
        const timer = this.timers.meditation;
        timer.isRunning = false;
        clearInterval(timer.interval);
        timer.remaining = timer.duration;
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        this.updateMeditationDisplay();
    }

    updateMeditationDisplay() {
        const timer = this.timers.meditation;
        const minutes = Math.floor(timer.remaining / 60);
        const seconds = timer.remaining % 60;
        timer.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    completeMeditation() {
        const timer = this.timers.meditation;
        timer.isRunning = false;
        clearInterval(timer.interval);
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        
        // Play completion sound (if available)
        this.playCompletionSound();
        
        // Show completion message
        window.PureWellness.showToast('Meditation session completed! Great job!', 'success', 5000);
        
        // Update progress
        this.updateProgress('meditation');
    }

    startBreathing(type) {
        const exercise = this.breathingExercises[type];
        if (!exercise.isRunning) {
            exercise.isRunning = true;
            exercise.startBtn.disabled = true;
            exercise.stopBtn.disabled = false;
            exercise.phase = 'inhale';
            exercise.count = 0;
            
            this.runBreathingCycle(type);
        }
    }

    stopBreathing(type) {
        const exercise = this.breathingExercises[type];
        exercise.isRunning = false;
        clearInterval(exercise.interval);
        exercise.startBtn.disabled = false;
        exercise.stopBtn.disabled = true;
        
        // Reset visual elements
        if (type === 'box') {
            exercise.fill.style.opacity = '0';
            exercise.text.textContent = 'Inhale';
        }
    }

    runBreathingCycle(type) {
        const exercise = this.breathingExercises[type];
        const currentPhase = exercise.phases[exercise.phase];
        
        exercise.phaseDisplay.textContent = currentPhase.instruction;
        exercise.count = currentPhase.duration;
        
        if (type === 'box') {
            exercise.text.textContent = currentPhase.name;
            exercise.fill.style.opacity = '0.3';
        }
        
        exercise.interval = setInterval(() => {
            exercise.count--;
            
            if (type === 'box') {
                const opacity = 0.3 + (0.7 * (currentPhase.duration - exercise.count) / currentPhase.duration);
                exercise.fill.style.opacity = opacity.toString();
            }
            
            if (exercise.count <= 0) {
                clearInterval(exercise.interval);
                
                // Move to next phase
                const phaseIndex = exercise.phases.indexOf(currentPhase);
                const nextPhaseIndex = (phaseIndex + 1) % exercise.phases.length;
                exercise.phase = exercise.phases[nextPhaseIndex].name.toLowerCase().replace(' ', '');
                
                if (exercise.isRunning) {
                    setTimeout(() => this.runBreathingCycle(type), 500);
                }
            }
        }, 1000);
    }

    startYoga() {
        const timer = this.timers.yoga;
        if (!timer.isRunning) {
            timer.isRunning = true;
            timer.startBtn.disabled = true;
            timer.pauseBtn.disabled = false;
            timer.currentPose = 0;
            
            this.startYogaPose();
        }
    }

    pauseYoga() {
        const timer = this.timers.yoga;
        if (timer.isRunning) {
            timer.isRunning = false;
            clearInterval(timer.interval);
            timer.startBtn.disabled = false;
            timer.pauseBtn.disabled = true;
        }
    }

    resetYoga() {
        const timer = this.timers.yoga;
        timer.isRunning = false;
        clearInterval(timer.interval);
        timer.currentPose = 0;
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        this.updateYogaDisplay();
    }

    startYogaPose() {
        const timer = this.timers.yoga;
        if (timer.currentPose >= timer.poses.length) {
            this.completeYoga();
            return;
        }
        
        const pose = timer.poses[timer.currentPose];
        timer.remaining = pose.duration;
        timer.poseDisplay.textContent = pose.name;
        
        timer.interval = setInterval(() => {
            timer.remaining--;
            this.updateYogaDisplay();
            
            if (timer.remaining <= 0) {
                clearInterval(timer.interval);
                timer.currentPose++;
                if (timer.isRunning) {
                    setTimeout(() => this.startYogaPose(), 1000);
                }
            }
        }, 1000);
    }

    updateYogaDisplay() {
        const timer = this.timers.yoga;
        const minutes = Math.floor(timer.remaining / 60);
        const seconds = timer.remaining % 60;
        timer.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    completeYoga() {
        const timer = this.timers.yoga;
        timer.isRunning = false;
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        
        window.PureWellness.showToast('Yoga flow completed! You did great!', 'success', 5000);
        this.updateProgress('yoga');
    }

    startStretch() {
        const timer = this.timers.stretch;
        if (!timer.isRunning) {
            timer.isRunning = true;
            timer.startBtn.disabled = true;
            timer.pauseBtn.disabled = false;
            timer.currentPose = 0;
            
            this.startStretchPose();
        }
    }

    pauseStretch() {
        const timer = this.timers.stretch;
        if (timer.isRunning) {
            timer.isRunning = false;
            clearInterval(timer.interval);
            timer.startBtn.disabled = false;
            timer.pauseBtn.disabled = true;
        }
    }

    resetStretch() {
        const timer = this.timers.stretch;
        timer.isRunning = false;
        clearInterval(timer.interval);
        timer.currentPose = 0;
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        this.updateStretchDisplay();
    }

    startStretchPose() {
        const timer = this.timers.stretch;
        if (timer.currentPose >= timer.poses.length) {
            this.completeStretch();
            return;
        }
        
        const pose = timer.poses[timer.currentPose];
        timer.remaining = pose.duration;
        timer.poseDisplay.textContent = pose.name;
        
        timer.interval = setInterval(() => {
            timer.remaining--;
            this.updateStretchDisplay();
            
            if (timer.remaining <= 0) {
                clearInterval(timer.interval);
                timer.currentPose++;
                if (timer.isRunning) {
                    setTimeout(() => this.startStretchPose(), 1000);
                }
            }
        }, 1000);
    }

    updateStretchDisplay() {
        const timer = this.timers.stretch;
        const minutes = Math.floor(timer.remaining / 60);
        const seconds = timer.remaining % 60;
        timer.display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    completeStretch() {
        const timer = this.timers.stretch;
        timer.isRunning = false;
        timer.startBtn.disabled = false;
        timer.pauseBtn.disabled = true;
        
        window.PureWellness.showToast('Stretch routine completed! Feel the relaxation!', 'success', 5000);
        this.updateProgress('stretch');
    }

    playCompletionSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    updateProgress(type) {
        const progress = window.PureWellness.storage.get('practice_progress') || {
            streak: 0,
            weeklySessions: 0,
            totalMinutes: 0,
            lastPractice: null
        };
        
        const today = new Date().toDateString();
        const lastPractice = new Date(progress.lastPractice || 0).toDateString();
        
        // Update streak
        if (lastPractice === today) {
            // Already practiced today, don't increment streak
        } else if (lastPractice === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
            // Practiced yesterday, increment streak
            progress.streak++;
        } else {
            // Missed a day, reset streak
            progress.streak = 1;
        }
        
        // Update weekly sessions
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const lastWeekStart = new Date(progress.lastPractice || 0);
        lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay());
        
        if (weekStart.toDateString() !== lastWeekStart.toDateString()) {
            progress.weeklySessions = 1;
        } else {
            progress.weeklySessions++;
        }
        
        // Update total minutes
        const sessionMinutes = this.getSessionMinutes(type);
        progress.totalMinutes += sessionMinutes;
        
        progress.lastPractice = new Date().toISOString();
        
        window.PureWellness.storage.set('practice_progress', progress);
        this.updateProgressDisplay();
    }

    getSessionMinutes(type) {
        switch (type) {
            case 'meditation':
                return this.timers.meditation.duration / 60;
            case 'yoga':
                return this.timers.yoga.poses.reduce((total, pose) => total + pose.duration, 0) / 60;
            case 'stretch':
                return this.timers.stretch.poses.reduce((total, pose) => total + pose.duration, 0) / 60;
            default:
                return 0;
        }
    }

    updateProgressDisplay() {
        const progress = window.PureWellness.storage.get('practice_progress') || {
            streak: 0,
            weeklySessions: 0,
            totalMinutes: 0
        };
        
        // Update streak display
        const streakElement = document.getElementById('streak-count');
        if (streakElement) {
            streakElement.textContent = progress.streak;
        }
        
        // Update weekly sessions display
        const weeklyElement = document.getElementById('weekly-count');
        if (weeklyElement) {
            weeklyElement.textContent = progress.weeklySessions;
        }
        
        // Update total time display
        const totalElement = document.getElementById('total-time');
        if (totalElement) {
            const hours = Math.floor(progress.totalMinutes / 60);
            const minutes = Math.floor(progress.totalMinutes % 60);
            totalElement.textContent = `${hours}h ${minutes}m`;
        }
    }

    loadProgress() {
        this.updateProgressDisplay();
    }
}

// Initialize practice timers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PracticeTimer();
});
