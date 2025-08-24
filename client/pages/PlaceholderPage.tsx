import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon: Icon = BookOpen 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/dashboard">
            <Button variant="ghost" className="text-navy-600 hover:text-navy-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-navy-200 shadow-xl max-w-md mx-auto">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-primary rounded-full p-4">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-navy-950">
                {title}
              </CardTitle>
              <CardDescription className="text-navy-600">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="bg-navy-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-navy-700">
                  This page is coming soon! Continue the conversation to have me build out this section of your application.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return to Dashboard
                  </Button>
                </Link>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Request Implementation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
