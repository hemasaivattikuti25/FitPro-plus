"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, Target, Calendar, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface UserProfile {
  name: string;
  goal: string;
  fitnessLevel: string;
  dietaryPreferences: string[];
  currentWeight: number;
  targetWeight: number;
  weeklyWorkouts: number;
  previousConversations: number;
}

export default function AICoach() {
  console.log("AICoach component loading");

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // User profile for personalized responses
  const [userProfile] = useState<UserProfile>({
    name: 'Alex',
    goal: 'Lose weight and build muscle',
    fitnessLevel: 'Intermediate',
    dietaryPreferences: ['High Protein', 'Low Carb'],
    currentWeight: 170,
    targetWeight: 160,
    weeklyWorkouts: 4,
    previousConversations: 23
  });

  console.log("User profile:", userProfile);

  const quickSuggestions = [
    "What should I eat for lunch today?",
    "Plan my workout for tomorrow",
    "Help me stay motivated",
    "Track my weekly progress",
    "Suggest a healthy snack",
    "How can I improve my sleep?"
  ];

  const weeklyInsights = [
    {
      icon: TrendingUp,
      title: "Great Progress!",
      content: "You've completed 85% of your workouts this week",
      color: "text-green-600"
    },
    {
      icon: Target,
      title: "Calorie Goal",
      content: "You're 150 calories under your daily target",
      color: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "Consistency",
      content: "12-day workout streak - keep it up!",
      color: "text-purple-600"
    }
  ];

  useEffect(() => {
    // Welcome message on component load
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hi ${userProfile.name}! 👋 I'm your AI fitness coach. I've been analyzing your progress and I'm excited to help you reach your goals today. What would you like to work on?`,
      timestamp: new Date(),
      suggestions: [
        "Plan today's workout",
        "Suggest meals for my goals",
        "Review my progress",
        "Motivate me!"
      ]
    };
    setMessages([welcomeMessage]);
  }, [userProfile.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simulate AI response based on user input
  const generateAIResponse = async (userInput: string): Promise<Message> => {
    console.log("Generating AI response for:", userInput);
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerInput = userInput.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (lowerInput.includes('workout') || lowerInput.includes('exercise')) {
      response = `Based on your ${userProfile.fitnessLevel.toLowerCase()} fitness level and goal to ${userProfile.goal.toLowerCase()}, I recommend:\n\n🏋️ **Today's Workout Plan:**\n• Warm-up: 5-10 minutes light cardio\n• Strength: Upper body focus (3 sets each)\n  - Push-ups: 12-15 reps\n  - Dumbbell rows: 10-12 reps\n  - Shoulder press: 8-10 reps\n• Cool-down: 5-10 minutes stretching\n\nThis should take about 45 minutes. Ready to crush it? 💪`;
      suggestions = ["Start this workout", "Modify the plan", "Track my workout"];
    }
    else if (lowerInput.includes('food') || lowerInput.includes('meal') || lowerInput.includes('eat') || lowerInput.includes('lunch')) {
      response = `Perfect timing! For your ${userProfile.goal.toLowerCase()} goal, here's what I suggest for lunch:\n\n🥗 **AI-Optimized Lunch:**\n• **Grilled Chicken Quinoa Bowl** (485 calories)\n  - 6oz grilled chicken breast (35g protein)\n  - 1/2 cup quinoa (22g carbs, 4g protein)\n  - Mixed vegetables (broccoli, bell peppers)\n  - Avocado slices (healthy fats)\n\nThis meal aligns perfectly with your high-protein, low-carb preferences and will keep you satisfied while supporting your goals! 🎯`;
      suggestions = ["Get this recipe", "Suggest alternatives", "Log this meal"];
    }
    else if (lowerInput.includes('progress') || lowerInput.includes('track')) {
      response = `Let me review your amazing progress! 📈\n\n**This Week's Highlights:**\n✅ 4/5 planned workouts completed\n✅ Average daily calories: 2,050 (right on target!)\n✅ Protein intake: 165g daily average\n✅ 12-day consistency streak\n\n**Key Insights:**\n• You're 6 lbs away from your target weight\n• Strength has improved 15% this month\n• Sleep quality: 7.2/10 average\n\nYou're doing fantastic! The consistency is really paying off. Keep this momentum going! 🚀`;
      suggestions = ["Set new goals", "Plan next week", "Share progress"];
    }
    else if (lowerInput.includes('motivat') || lowerInput.includes('help') || lowerInput.includes('encourage')) {
      response = `${userProfile.name}, you are absolutely CRUSHING IT! 🔥\n\n**Remember why you started:**\n• You've already come so far - 12 days straight!\n• Every workout makes you 1% stronger\n• Your future self will thank you for today's effort\n\n**Today's power mantra:**\n"I am consistent, I am strong, I am worth the effort!" 💪\n\nYou've got this! What's one small win you can achieve right now?`;
      suggestions = ["Plan my next workout", "Set a mini goal", "Track today's wins"];
    }
    else if (lowerInput.includes('sleep') || lowerInput.includes('rest')) {
      response = `Great question! Quality sleep is crucial for your ${userProfile.goal.toLowerCase()} goals. 😴\n\n**AI Sleep Optimization Tips:**\n• Go to bed by 10:30 PM (based on your workout schedule)\n• No screens 1 hour before bed\n• Keep bedroom at 65-68°F\n• Try magnesium supplement 30 mins before bed\n• Morning sunlight within first hour of waking\n\n**Tonight's goal:** Aim for 7-8 hours to support muscle recovery and fat loss!`;
      suggestions = ["Set sleep reminder", "Track sleep tonight", "More recovery tips"];
    }
    else if (lowerInput.includes('snack') || lowerInput.includes('hungry')) {
      response = `Smart snacking for your goals! 🍎\n\n**AI-Recommended Snacks:**\n• **Greek yogurt + berries** (150 cal, 15g protein)\n• **Apple + almond butter** (180 cal, balanced macros)\n• **Hard-boiled eggs** (140 cal, 12g protein)\n• **Protein smoothie** (200 cal, 25g protein)\n\nThese will keep you satisfied and aligned with your high-protein preferences without derailing your calorie goals!`;
      suggestions = ["Log my snack", "Prep snacks for tomorrow", "More options"];
    }
    else {
      response = `I'm here to help with your fitness and nutrition journey! I can assist with:\n\n🏋️ Workout planning and tracking\n🥗 Meal suggestions and nutrition advice\n📊 Progress analysis and insights\n💪 Motivation and goal setting\n😴 Recovery and sleep optimization\n\nWhat would you like to focus on today?`;
      suggestions = ["Plan my workout", "Suggest a meal", "Review my progress", "Motivate me"];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    console.log("Sending message:", inputMessage);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI response error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing that right now. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log("Suggestion clicked:", suggestion);
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6" data-macaly="ai-coach">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-2" data-macaly="coach-title">
          AI Fitness Coach 🤖
        </h2>
        <p className="text-gray-600" data-macaly="coach-subtitle">
          Your personal AI trainer with {userProfile.previousConversations} conversations
        </p>
      </div>

      {/* Weekly Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        {weeklyInsights.map((insight, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <insight.icon className={`h-8 w-8 mx-auto mb-2 ${insight.color}`} />
              <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-gray-600">{insight.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-fitness-gradient text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            FitFusion AI Coach
            <Badge className="bg-white text-primary ml-auto">
              Online
            </Badge>
          </CardTitle>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'ai' ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-white ml-8' 
                      : 'bg-gray-100 text-gray-800 mr-8'
                  }`}>
                    <div className="whitespace-pre-line text-sm">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* AI Suggestions */}
                  {message.type === 'ai' && message.suggestions && (
                    <div className="mt-2 space-y-1 mr-8">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs mr-2 mb-1"
                          data-macaly={`suggestion-${index}`}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-8">
                  <div className="flex items-center gap-1">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          {/* Quick Suggestions */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                  data-macaly={`quick-suggestion-${index}`}
                >
                  <Lightbulb className="mr-1 h-3 w-3" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about workouts, nutrition, or motivation..."
              disabled={isTyping}
              className="flex-1"
              data-macaly="chat-input"
            />
            <Button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              data-macaly="send-message-btn"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}