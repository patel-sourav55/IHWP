// Pure Wellness - Quiz Functionality

class WellnessQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.totalQuestions = 15;
        this.quizData = this.getQuizData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedProgress();
    }

    bindEvents() {
        const startBtn = document.getElementById('start-quiz');
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');
        const retakeBtn = document.getElementById('retake-quiz');
        const saveBtn = document.getElementById('save-results');
        const shareBtn = document.getElementById('share-results');

        if (startBtn) startBtn.addEventListener('click', () => this.startQuiz());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (retakeBtn) retakeBtn.addEventListener('click', () => this.retakeQuiz());
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveResults());
        if (shareBtn) shareBtn.addEventListener('click', () => this.shareResults());
    }

    getQuizData() {
        return [
            {
                id: 'physical_activity',
                title: 'Physical Activity',
                question: 'How often do you engage in physical exercise?',
                options: [
                    { value: 5, text: 'Daily (30+ minutes)' },
                    { value: 4, text: '4-6 times per week' },
                    { value: 3, text: '2-3 times per week' },
                    { value: 2, text: 'Once a week' },
                    { value: 1, text: 'Rarely or never' }
                ]
            },
            {
                id: 'nutrition',
                title: 'Nutrition',
                question: 'How would you describe your daily diet?',
                options: [
                    { value: 5, text: 'Mostly whole foods, balanced meals' },
                    { value: 4, text: 'Generally healthy with occasional treats' },
                    { value: 3, text: 'Mixed - some healthy, some processed foods' },
                    { value: 2, text: 'Often processed or fast food' },
                    { value: 1, text: 'Mostly processed or fast food' }
                ]
            },
            {
                id: 'sleep',
                title: 'Sleep Quality',
                question: 'How would you rate your sleep quality?',
                options: [
                    { value: 5, text: 'Excellent - 7-9 hours, restful' },
                    { value: 4, text: 'Good - mostly restful' },
                    { value: 3, text: 'Fair - some sleep issues' },
                    { value: 2, text: 'Poor - frequent sleep problems' },
                    { value: 1, text: 'Very poor - chronic sleep issues' }
                ]
            },
            {
                id: 'stress',
                title: 'Stress Management',
                question: 'How well do you manage daily stress?',
                options: [
                    { value: 5, text: 'Very well - I have effective coping strategies' },
                    { value: 4, text: 'Well - I usually handle stress okay' },
                    { value: 3, text: 'Moderately - sometimes struggle' },
                    { value: 2, text: 'Poorly - often feel overwhelmed' },
                    { value: 1, text: 'Very poorly - constantly stressed' }
                ]
            },
            {
                id: 'hydration',
                title: 'Hydration',
                question: 'How much water do you typically drink daily?',
                options: [
                    { value: 5, text: '8+ glasses (64+ oz)' },
                    { value: 4, text: '6-7 glasses (48-56 oz)' },
                    { value: 3, text: '4-5 glasses (32-40 oz)' },
                    { value: 2, text: '2-3 glasses (16-24 oz)' },
                    { value: 1, text: 'Less than 2 glasses (16 oz)' }
                ]
            },
            {
                id: 'mental_health',
                title: 'Mental Health',
                question: 'How would you describe your overall mood and mental well-being?',
                options: [
                    { value: 5, text: 'Excellent - positive, energetic, optimistic' },
                    { value: 4, text: 'Good - generally positive' },
                    { value: 3, text: 'Fair - mixed emotions' },
                    { value: 2, text: 'Poor - often negative or anxious' },
                    { value: 1, text: 'Very poor - depressed or anxious' }
                ]
            },
            {
                id: 'social_connections',
                title: 'Social Connections',
                question: 'How satisfied are you with your social relationships?',
                options: [
                    { value: 5, text: 'Very satisfied - strong, supportive relationships' },
                    { value: 4, text: 'Satisfied - good relationships' },
                    { value: 3, text: 'Moderately satisfied' },
                    { value: 2, text: 'Somewhat dissatisfied' },
                    { value: 1, text: 'Very dissatisfied - isolated or lonely' }
                ]
            },
            {
                id: 'work_life_balance',
                title: 'Work-Life Balance',
                question: 'How would you rate your work-life balance?',
                options: [
                    { value: 5, text: 'Excellent - well-balanced' },
                    { value: 4, text: 'Good - mostly balanced' },
                    { value: 3, text: 'Fair - sometimes unbalanced' },
                    { value: 2, text: 'Poor - often unbalanced' },
                    { value: 1, text: 'Very poor - severely unbalanced' }
                ]
            },
            {
                id: 'mindfulness',
                title: 'Mindfulness & Meditation',
                question: 'How often do you practice mindfulness or meditation?',
                options: [
                    { value: 5, text: 'Daily' },
                    { value: 4, text: 'Several times per week' },
                    { value: 3, text: 'Weekly' },
                    { value: 2, text: 'Occasionally' },
                    { value: 1, text: 'Never' }
                ]
            },
            {
                id: 'screen_time',
                title: 'Screen Time',
                question: 'How much time do you spend on screens daily (work + leisure)?',
                options: [
                    { value: 5, text: 'Less than 4 hours' },
                    { value: 4, text: '4-6 hours' },
                    { value: 3, text: '6-8 hours' },
                    { value: 2, text: '8-10 hours' },
                    { value: 1, text: 'More than 10 hours' }
                ]
            },
            {
                id: 'alcohol_consumption',
                title: 'Alcohol Consumption',
                question: 'How often do you consume alcohol?',
                options: [
                    { value: 5, text: 'Never or rarely' },
                    { value: 4, text: 'Occasionally (1-2 drinks per week)' },
                    { value: 3, text: 'Moderately (3-4 drinks per week)' },
                    { value: 2, text: 'Regularly (5-7 drinks per week)' },
                    { value: 1, text: 'Frequently (8+ drinks per week)' }
                ]
            },
            {
                id: 'smoking',
                title: 'Smoking',
                question: 'Do you smoke or use tobacco products?',
                options: [
                    { value: 5, text: 'Never smoked' },
                    { value: 4, text: 'Quit more than 5 years ago' },
                    { value: 3, text: 'Quit within the last 5 years' },
                    { value: 2, text: 'Occasionally' },
                    { value: 1, text: 'Regularly' }
                ]
            },
            {
                id: 'preventive_care',
                title: 'Preventive Healthcare',
                question: 'How regularly do you visit healthcare providers for check-ups?',
                options: [
                    { value: 5, text: 'Annually and as needed' },
                    { value: 4, text: 'Mostly annually' },
                    { value: 3, text: 'Every 2-3 years' },
                    { value: 2, text: 'Only when sick' },
                    { value: 1, text: 'Rarely or never' }
                ]
            },
            {
                id: 'hobbies',
                title: 'Hobbies & Interests',
                question: 'How much time do you spend on hobbies or activities you enjoy?',
                options: [
                    { value: 5, text: 'Daily' },
                    { value: 4, text: 'Several times per week' },
                    { value: 3, text: 'Weekly' },
                    { value: 2, text: 'Occasionally' },
                    { value: 1, text: 'Rarely or never' }
                ]
            },
            {
                id: 'life_satisfaction',
                title: 'Life Satisfaction',
                question: 'Overall, how satisfied are you with your current life?',
                options: [
                    { value: 5, text: 'Very satisfied' },
                    { value: 4, text: 'Satisfied' },
                    { value: 3, text: 'Neutral' },
                    { value: 2, text: 'Dissatisfied' },
                    { value: 1, text: 'Very dissatisfied' }
                ]
            }
        ];
    }

    startQuiz() {
        document.getElementById('quiz-intro').style.display = 'none';
        document.getElementById('quiz-questions').style.display = 'block';
        this.showQuestion();
    }

    showQuestion() {
        const question = this.quizData[this.currentQuestion];
        const questionTitle = document.getElementById('question-title');
        const questionText = document.getElementById('question-text');
        const questionOptions = document.getElementById('question-options');
        const progressText = document.getElementById('progress-text');
        const progressFill = document.getElementById('progress-fill');
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');

        // Update progress
        const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        progressText.textContent = `Question ${this.currentQuestion + 1} of ${this.totalQuestions}`;
        progressFill.style.width = `${progress}%`;

        // Show/hide previous button
        prevBtn.style.display = this.currentQuestion > 0 ? 'block' : 'none';

        // Update question content
        questionTitle.textContent = question.title;
        questionText.textContent = question.question;

        // Generate options
        questionOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'form-group';
            optionElement.innerHTML = `
                <label class="flex" style="align-items: center; padding: var(--spacing-md); border: 2px solid var(--bg-tertiary); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast);">
                    <input type="radio" name="question_${this.currentQuestion}" value="${option.value}" style="margin-right: var(--spacing-md);">
                    <span>${option.text}</span>
                </label>
            `;

            // Add click handler for the entire label
            const label = optionElement.querySelector('label');
            label.addEventListener('click', () => {
                // Remove active class from all options
                questionOptions.querySelectorAll('label').forEach(l => {
                    l.style.borderColor = 'var(--bg-tertiary)';
                    l.style.backgroundColor = 'transparent';
                });
                
                // Add active class to selected option
                label.style.borderColor = 'var(--primary-color)';
                label.style.backgroundColor = 'var(--bg-secondary)';
                
                // Enable next button
                nextBtn.disabled = false;
                
                // Save answer
                this.answers[question.id] = parseInt(option.value);
                this.saveProgress();
            });

            questionOptions.appendChild(optionElement);
        });

        // Check if question already answered
        if (this.answers[question.id]) {
            const radioInput = questionOptions.querySelector(`input[value="${this.answers[question.id]}"]`);
            if (radioInput) {
                radioInput.checked = true;
                radioInput.closest('label').style.borderColor = 'var(--primary-color)';
                radioInput.closest('label').style.backgroundColor = 'var(--bg-secondary)';
                nextBtn.disabled = false;
            }
        } else {
            nextBtn.disabled = true;
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    showResults() {
        document.getElementById('quiz-questions').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        const results = this.calculateResults();
        this.displayResults(results);
    }

    calculateResults() {
        const categories = {
            physical: ['physical_activity', 'sleep', 'hydration'],
            nutrition: ['nutrition', 'alcohol_consumption', 'smoking'],
            mental: ['mental_health', 'stress', 'mindfulness'],
            social: ['social_connections', 'work_life_balance', 'hobbies'],
            lifestyle: ['screen_time', 'preventive_care', 'life_satisfaction']
        };

        const scores = {};
        let totalScore = 0;
        let totalPossible = 0;

        Object.keys(categories).forEach(category => {
            let categoryScore = 0;
            let categoryPossible = 0;
            
            categories[category].forEach(questionId => {
                if (this.answers[questionId]) {
                    categoryScore += this.answers[questionId];
                    categoryPossible += 5; // Max score per question
                }
            });
            
            scores[category] = {
                score: categoryScore,
                possible: categoryPossible,
                percentage: categoryPossible > 0 ? Math.round((categoryScore / categoryPossible) * 100) : 0
            };
            
            totalScore += categoryScore;
            totalPossible += categoryPossible;
        });

        const overallPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

        return {
            overall: overallPercentage,
            categories: scores,
            recommendations: this.generateRecommendations(scores)
        };
    }

    displayResults(results) {
        // Overall score
        const overallScoreEl = document.getElementById('overall-score');
        const scoreDescEl = document.getElementById('score-description');
        
        overallScoreEl.textContent = results.overall;
        
        let description = '';
        if (results.overall >= 90) {
            description = 'Excellent! You have outstanding wellness habits. Keep up the great work!';
        } else if (results.overall >= 75) {
            description = 'Great job! You have good wellness habits with room for some improvements.';
        } else if (results.overall >= 60) {
            description = 'Good foundation! There are several areas where you can make meaningful improvements.';
        } else if (results.overall >= 45) {
            description = 'There\'s significant room for improvement. Focus on the key areas identified below.';
        } else {
            description = 'Your wellness needs attention. Consider working with a wellness coach for support.';
        }
        scoreDescEl.textContent = description;

        // Category scores
        const categoryScoresEl = document.getElementById('category-scores');
        categoryScoresEl.innerHTML = '';

        const categoryNames = {
            physical: 'Physical Health',
            nutrition: 'Nutrition',
            mental: 'Mental Health',
            social: 'Social Wellness',
            lifestyle: 'Lifestyle'
        };

        Object.keys(results.categories).forEach(category => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'card text-center';
            categoryEl.innerHTML = `
                <h4>${categoryNames[category]}</h4>
                <div style="font-size: 2rem; font-weight: var(--font-weight-bold); color: var(--primary-color); margin: var(--spacing-md) 0;">
                    ${results.categories[category].percentage}%
                </div>
                <div class="progress-bar" style="margin-bottom: var(--spacing-md);">
                    <div class="progress-fill" style="width: ${results.categories[category].percentage}%;"></div>
                </div>
            `;
            categoryScoresEl.appendChild(categoryEl);
        });

        // Recommendations
        const recommendationsEl = document.getElementById('recommendations-list');
        recommendationsEl.innerHTML = '';

        results.recommendations.forEach(rec => {
            const recEl = document.createElement('div');
            recEl.className = 'card';
            recEl.innerHTML = `
                <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">${rec.category}</h4>
                <p style="margin-bottom: var(--spacing-md);">${rec.description}</p>
                <ul style="margin-bottom: 0;">
                    ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            `;
            recommendationsEl.appendChild(recEl);
        });
    }

    generateRecommendations(scores) {
        const recommendations = [];

        Object.keys(scores).forEach(category => {
            const score = scores[category];
            if (score.percentage < 70) {
                recommendations.push(this.getCategoryRecommendation(category, score.percentage));
            }
        });

        return recommendations;
    }

    getCategoryRecommendation(category, percentage) {
        const recommendations = {
            physical: {
                category: 'Physical Health',
                description: 'Focus on improving your physical activity, sleep quality, and hydration habits.',
                actions: [
                    'Aim for at least 150 minutes of moderate exercise per week',
                    'Establish a consistent sleep schedule',
                    'Drink 8 glasses of water daily',
                    'Consider our fitness training programs'
                ]
            },
            nutrition: {
                category: 'Nutrition',
                description: 'Improve your eating habits and reduce harmful substances.',
                actions: [
                    'Focus on whole, unprocessed foods',
                    'Limit alcohol consumption',
                    'Avoid smoking and tobacco products',
                    'Schedule a nutrition consultation'
                ]
            },
            mental: {
                category: 'Mental Health',
                description: 'Prioritize your mental well-being and stress management.',
                actions: [
                    'Practice daily meditation or mindfulness',
                    'Develop stress management techniques',
                    'Consider professional mental health support',
                    'Join our mindfulness group sessions'
                ]
            },
            social: {
                category: 'Social Wellness',
                description: 'Strengthen your relationships and work-life balance.',
                actions: [
                    'Make time for meaningful social connections',
                    'Set boundaries between work and personal life',
                    'Engage in hobbies and activities you enjoy',
                    'Join our community wellness programs'
                ]
            },
            lifestyle: {
                category: 'Lifestyle',
                description: 'Optimize your daily habits and preventive care.',
                actions: [
                    'Reduce screen time and take regular breaks',
                    'Schedule regular health check-ups',
                    'Focus on activities that bring you joy',
                    'Consider our comprehensive wellness packages'
                ]
            }
        };

        return recommendations[category] || {
            category: 'General Wellness',
            description: 'Continue working on all aspects of your wellness.',
            actions: [
                'Maintain your current healthy habits',
                'Set new wellness goals',
                'Consider advanced wellness programs'
            ]
        };
    }

    retakeQuiz() {
        this.currentQuestion = 0;
        this.answers = {};
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-intro').style.display = 'block';
        this.clearSavedProgress();
    }

    saveResults() {
        const results = this.calculateResults();
        const resultsData = {
            timestamp: new Date().toISOString(),
            overall: results.overall,
            categories: results.categories,
            answers: this.answers
        };

        window.PureWellness.storage.set('quiz_results', resultsData);
        window.PureWellness.showToast('Results saved successfully!', 'success');
    }

    shareResults() {
        const results = this.calculateResults();
        const shareText = `I just completed the Pure Wellness Assessment and scored ${results.overall}%! Check out your wellness profile at Pure Wellness.`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Wellness Assessment Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                window.PureWellness.showToast('Results copied to clipboard!', 'success');
            });
        }
    }

    saveProgress() {
        const progressData = {
            currentQuestion: this.currentQuestion,
            answers: this.answers
        };
        window.PureWellness.storage.set('quiz_progress', progressData);
    }

    loadSavedProgress() {
        const savedProgress = window.PureWellness.storage.get('quiz_progress');
        if (savedProgress) {
            this.currentQuestion = savedProgress.currentQuestion || 0;
            this.answers = savedProgress.answers || {};
        }
    }

    clearSavedProgress() {
        window.PureWellness.storage.remove('quiz_progress');
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WellnessQuiz();
});
