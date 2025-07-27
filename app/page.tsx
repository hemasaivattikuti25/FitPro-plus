"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Zap, Target, Calendar, Brain, Camera, Trophy, 
  ChevronRight, Play, Flame, Droplets, Timer, TrendingUp,
  User, Settings, Bell, Award, Sparkles, BarChart3
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import WorkoutTracker from '@/components/WorkoutTracker';
import MealPlanner from '@/components/MealPlanner';
import AICoach from '@/components/AICoach';
import FoodScanner from '@/components/FoodScanner';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 300
    }
  }
};

export default function FitFusionPro() {
  console.log("FitFusion Pro Loading - Advanced Fitness Platform");
  
  const [activeModule, setActiveModule] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [achievements, setAchievements] = useState([
    { id: 1, title: "7-Day Streak", unlocked: true, points: 100 },
    { id: 2, title: "Protein Goal", unlocked: true, points: 50 },
    { id: 3, title: "5K Steps", unlocked: false, points: 25 }
  ]);

  // Advanced user analytics
  const [userMetrics, setUserMetrics] = useState({
    name: 'Alexandra Chen',
    level: 'Elite Athlete',
    totalPoints: 2847,
    weekStreak: 14,
    monthlyGoal: 85,
    currentProgress: 78,
    todayCalories: { consumed: 1847, target: 2200, burned: 420 },
    macros: { protein: 142, carbs: 165, fat: 58 },
    targets: { protein: 165, carbs: 220, fat: 70 },
    workoutStats: { completed: 4, target: 5, minutes: 180 },
    hydration: { glasses: 7, target: 10 },
    sleep: { hours: 7.2, target: 8, quality: 85 },
    heartRate: { resting: 58, max: 182, zones: [65, 78, 89, 95] }
  });

  // Chart data
  const weeklyProgressData = [
    { day: 'Mon', calories: 2100, workouts: 1, mood: 8 },
    { day: 'Tue', calories: 1950, workouts: 0, mood: 7 },
    { day: 'Wed', calories: 2200, workouts: 1, mood: 9 },
    { day: 'Thu', calories: 1800, workouts: 1, mood: 8 },
    { day: 'Fri', calories: 2350, workouts: 0, mood: 6 },
    { day: 'Sat', calories: 2100, workouts: 1, mood: 9 },
    { day: 'Sun', calories: 1847, workouts: 1, mood: 8 }
  ];

  const macroData = [
    { name: 'Protein', value: userMetrics.macros.protein, color: '#0ea5e9', target: userMetrics.targets.protein },
    { name: 'Carbs', value: userMetrics.macros.carbs, color: '#d946ef', target: userMetrics.targets.carbs },
    { name: 'Fat', value: userMetrics.macros.fat, color: '#22c55e', target: userMetrics.targets.fat }
  ];

  console.log("User metrics loaded:", userMetrics);
  console.log("Weekly progress data:", weeklyProgressData);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getMotivationalMessage = () => {
    const messages = {
      morning: "Time to conquer the day! Your body is ready for greatness 🌅",
      afternoon: "Keep the momentum going! You're already crushing today 🔥",
      evening: "Perfect time to wind down and plan tomorrow's victory 🌙"
    };
    return messages[getTimeOfDay() as keyof typeof messages];
  };

  const renderActiveModule = () => {
    console.log("Rendering advanced module:", activeModule);
    switch(activeModule) {
      case 'workouts':
        return <WorkoutTracker />;
      case 'nutrition':
        return <MealPlanner />;
      case 'scanner':
        return <FoodScanner />;
      case 'coach':
        return <AICoach />;
      default:
        return renderAdvancedDashboard();
    }
  };

  const renderAdvancedDashboard = () => (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Glassmorphism */}
      <motion.div 
        className="relative overflow-hidden rounded-4xl"
        variants={itemVariants}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg')`
          }}
        />
        <div className="relative bg-fitness-premium p-8 md:p-12">
          <div className="absolute inset-0 bg-glass-gradient backdrop-blur-xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30 mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Elite Member
                </Badge>
              </motion.div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Good {getTimeOfDay()},
                  <br />
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {userMetrics.name.split(' ')[0]}! 👋
                  </span>
                </h1>
                <p className="text-xl text-white/80 max-w-md">
                  {getMotivationalMessage()}
                </p>
              </div>

              <motion.div 
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={() => setActiveModule('workouts')}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 px-6 py-3"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Workout
                </Button>
                <Button 
                  onClick={() => setActiveModule('scanner')}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-3"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  AI Scanner
                </Button>
              </motion.div>
            </div>

            {/* Achievement Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">{userMetrics.totalPoints}</span>
                </div>
                <p className="text-white/70 text-sm">Total Points</p>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="h-8 w-8 text-orange-400" />
                  <span className="text-2xl font-bold text-white">{userMetrics.weekStreak}</span>
                </div>
                <p className="text-white/70 text-sm">Day Streak</p>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">{userMetrics.currentProgress}%</span>
                </div>
                <p className="text-white/70 text-sm">Monthly Goal</p>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${userMetrics.currentProgress}%` }}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="h-8 w-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">{userMetrics.heartRate.resting}</span>
                </div>
                <p className="text-white/70 text-sm">Resting BPM</p>
                <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Analytics Grid */}
      <motion.div 
        className="grid lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Weekly Progress Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-white/50 backdrop-blur-lg border-white/20 shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                Weekly Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyProgressData}>
                    <defs>
                      <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)', 
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#0ea5e9" 
                      strokeWidth={3}
                      fill="url(#caloriesGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Macro Distribution */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/50 backdrop-blur-lg border-white/20 shadow-glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Target className="h-5 w-5 text-accent-600" />
                Today's Macros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {macroData.map((macro) => (
                <div key={macro.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium" style={{ color: macro.color }}>
                      {macro.name}
                    </span>
                    <span className="text-gray-600">
                      {macro.value}g / {macro.target}g
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: macro.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(macro.value / macro.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Smart Metrics Grid */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {/* Calories */}
        <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Flame className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{userMetrics.todayCalories.consumed}</p>
                  <p className="text-orange-100 text-sm">of {userMetrics.todayCalories.target}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Burned: {userMetrics.todayCalories.burned}</span>
                  <span>Net: {userMetrics.todayCalories.consumed - userMetrics.todayCalories.burned}</span>
                </div>
                <Progress 
                  value={(userMetrics.todayCalories.consumed / userMetrics.todayCalories.target) * 100} 
                  className="bg-orange-200/30" 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Workouts */}
        <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{userMetrics.workoutStats.completed}</p>
                  <p className="text-blue-100 text-sm">of {userMetrics.workoutStats.target} this week</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Minutes: {userMetrics.workoutStats.minutes}</span>
                  <span>Avg: {Math.round(userMetrics.workoutStats.minutes / userMetrics.workoutStats.completed)}min</span>
                </div>
                <Progress 
                  value={(userMetrics.workoutStats.completed / userMetrics.workoutStats.target) * 100} 
                  className="bg-blue-200/30" 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hydration */}
        <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Droplets className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{userMetrics.hydration.glasses}</p>
                  <p className="text-cyan-100 text-sm">of {userMetrics.hydration.target} glasses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Remaining: {userMetrics.hydration.target - userMetrics.hydration.glasses}</span>
                  <span>{Math.round((userMetrics.hydration.glasses / userMetrics.hydration.target) * 100)}%</span>
                </div>
                <Progress 
                  value={(userMetrics.hydration.glasses / userMetrics.hydration.target) * 100} 
                  className="bg-cyan-200/30" 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sleep */}
        <motion.div variants={itemVariants} whileHover={cardHoverVariants.hover}>
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Timer className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{userMetrics.sleep.hours}h</p>
                  <p className="text-indigo-100 text-sm">Quality: {userMetrics.sleep.quality}%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target: {userMetrics.sleep.target}h</span>
                  <span>Deep: 2.1h</span>
                </div>
                <Progress 
                  value={(userMetrics.sleep.hours / userMetrics.sleep.target) * 100} 
                  className="bg-indigo-200/30" 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* AI Insights & Quick Actions */}
      <motion.div 
        className="grid lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* AI Insights */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                AI Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="h-5 w-5 mt-0.5 text-green-300" />
                  <div>
                    <p className="font-medium">Strength Improvement</p>
                    <p className="text-sm text-purple-100">Your lifting capacity increased 8% this month. Keep the progressive overload!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Target className="h-5 w-5 mt-0.5 text-blue-300" />
                  <div>
                    <p className="font-medium">Nutrition Optimization</p>
                    <p className="text-sm text-purple-100">Consider adding 20g more protein post-workout for better recovery.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Award className="h-5 w-5 mt-0.5 text-yellow-300" />
                  <div>
                    <p className="font-medium">Achievement Ready</p>
                    <p className="text-sm text-purple-100">3 more workouts to unlock "Monthly Warrior" badge!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/50 backdrop-blur-lg border-white/20 shadow-glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Zap className="h-6 w-6 text-primary-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => setActiveModule('workouts')}
                  className="h-16 flex-col gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white border-0"
                >
                  <Play className="h-5 w-5" />
                  <span className="text-sm">Start Workout</span>
                </Button>
                
                <Button 
                  onClick={() => setActiveModule('scanner')}
                  className="h-16 flex-col gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white border-0"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-sm">Scan Food</span>
                </Button>
                
                <Button 
                  onClick={() => setActiveModule('nutrition')}
                  className="h-16 flex-col gap-2 bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white border-0"
                >
                  <Target className="h-5 w-5" />
                  <span className="text-sm">Meal Plan</span>
                </Button>
                
                <Button 
                  onClick={() => setActiveModule('coach')}
                  className="h-16 flex-col gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                >
                  <Brain className="h-5 w-5" />
                  <span className="text-sm">AI Coach</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Advanced Navigation */}
      <motion.nav 
        className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-fitness-premium rounded-2xl flex items-center justify-center shadow-glow">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  FitFusion.ai Pro
                </h1>
                <p className="text-xs text-gray-500">Elite Fitness Platform</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-2">
              {['dashboard', 'workouts', 'nutrition', 'coach'].map((module) => (
                <Button 
                  key={module}
                  variant={activeModule === module ? 'default' : 'ghost'}
                  onClick={() => setActiveModule(module)}
                  size="sm"
                  className={activeModule === module ? 
                    "bg-gradient-to-r from-primary-500 to-primary-600 text-white" : 
                    "hover:bg-white/50 text-gray-700"
                  }
                >
                  {module.charAt(0).toUpperCase() + module.slice(1)}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-700">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      {activeModule === 'dashboard' && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setActiveModule('scanner')}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-500 to-pink-500 shadow-2xl hover:shadow-glow border-0"
            >
              <Camera className="h-7 w-7 text-white" />
            </Button>
          </motion.div>
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 to-pink-500 animate-ping opacity-20" />
        </motion.div>
      )}
    </div>
  );
}