import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Shield,
  Mail,
  Bell,
  Database,
  Server,
  Globe,
  Lock,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/AdminLayout';

export default function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'UniNotes',
    siteDescription: 'University Note-Taking Platform',
    maintenanceMode: false,
    registrationEnabled: true,
    maxFileSize: '10',
    sessionTimeout: '24'
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: '8',
    requireSpecialChars: true,
    enableTwoFactor: false,
    sessionSecurity: 'medium',
    ipWhitelist: '',
    maxLoginAttempts: '5'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.university.edu',
    smtpPort: '587',
    smtpUsername: 'noreply@university.edu',
    smtpPassword: '',
    fromEmail: 'noreply@university.edu',
    fromName: 'UniNotes System'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    adminAlerts: true,
    systemAlerts: true,
    userWelcomeEmail: true,
    weeklyReports: false
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    remoteBackup: false,
    backupLocation: '/backups'
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSystemRestart = async () => {
    // Simulate system restart
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('System restart initiated. Services will be temporarily unavailable.');
  };

  const handleClearCache = async () => {
    // Simulate cache clearing
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('System cache cleared successfully.');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-navy-950">System Settings</h1>
              <p className="text-navy-600 mt-2">Configure system-wide settings and preferences</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Settings
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
            >
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-green-800">Settings saved successfully!</span>
            </motion.div>
          )}

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-accent" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Basic system configuration and site information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={generalSettings.siteName}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={generalSettings.sessionTimeout}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={generalSettings.siteDescription}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                        <Input
                          id="maxFileSize"
                          type="number"
                          value={generalSettings.maxFileSize}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, maxFileSize: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-navy-950">System Controls</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Maintenance Mode</Label>
                          <p className="text-sm text-navy-500">Temporarily disable user access for maintenance</p>
                        </div>
                        <Switch
                          checked={generalSettings.maintenanceMode}
                          onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">User Registration</Label>
                          <p className="text-sm text-navy-500">Allow new users to register accounts</p>
                        </div>
                        <Switch
                          checked={generalSettings.registrationEnabled}
                          onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, registrationEnabled: checked }))}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-navy-950">System Operations</h3>
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleClearCache}
                          variant="outline"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Clear Cache
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                              <Server className="h-4 w-4 mr-2" />
                              Restart System
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Restart System</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will restart all system services. Users will be temporarily disconnected. Are you sure?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleSystemRestart} className="bg-red-600 hover:bg-red-700">
                                Restart System
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-accent" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Configure authentication and security policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          value={securitySettings.passwordMinLength}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={securitySettings.maxLoginAttempts}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionSecurity">Session Security Level</Label>
                      <Select 
                        value={securitySettings.sessionSecurity} 
                        onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionSecurity: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Basic session management</SelectItem>
                          <SelectItem value="medium">Medium - Enhanced security</SelectItem>
                          <SelectItem value="high">High - Maximum security</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ipWhitelist">IP Whitelist (one per line)</Label>
                      <Textarea
                        id="ipWhitelist"
                        placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                        value={securitySettings.ipWhitelist}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Require Special Characters</Label>
                          <p className="text-sm text-navy-500">Enforce special characters in passwords</p>
                        </div>
                        <Switch
                          checked={securitySettings.requireSpecialChars}
                          onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Two-Factor Authentication</Label>
                          <p className="text-sm text-navy-500">Enable 2FA for all users</p>
                        </div>
                        <Switch
                          checked={securitySettings.enableTwoFactor}
                          onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableTwoFactor: checked }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-accent" />
                      Email Settings
                    </CardTitle>
                    <CardDescription>
                      Configure SMTP settings for outgoing emails
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={emailSettings.smtpHost}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          value={emailSettings.smtpPort}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="smtpUsername">SMTP Username</Label>
                        <Input
                          id="smtpUsername"
                          value={emailSettings.smtpUsername}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input
                          id="smtpPassword"
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fromEmail">From Email</Label>
                        <Input
                          id="fromEmail"
                          type="email"
                          value={emailSettings.fromEmail}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fromName">From Name</Label>
                        <Input
                          id="fromName"
                          value={emailSettings.fromName}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="bg-navy-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-navy-600" />
                        <span className="font-medium text-navy-700">Email Test</span>
                      </div>
                      <p className="text-sm text-navy-600 mb-3">
                        Send a test email to verify SMTP configuration
                      </p>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Test Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-accent" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Configure system-wide notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Email Notifications</Label>
                          <p className="text-sm text-navy-500">Send notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Push Notifications</Label>
                          <p className="text-sm text-navy-500">Send push notifications to browsers</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Admin Alerts</Label>
                          <p className="text-sm text-navy-500">Critical system alerts for administrators</p>
                        </div>
                        <Switch
                          checked={notificationSettings.adminAlerts}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, adminAlerts: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">System Alerts</Label>
                          <p className="text-sm text-navy-500">Automated system health notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.systemAlerts}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, systemAlerts: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Welcome Emails</Label>
                          <p className="text-sm text-navy-500">Send welcome email to new users</p>
                        </div>
                        <Switch
                          checked={notificationSettings.userWelcomeEmail}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, userWelcomeEmail: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-navy-700 font-medium">Weekly Reports</Label>
                          <p className="text-sm text-navy-500">Send weekly analytics reports</p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Backup Settings */}
            <TabsContent value="backup">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-navy-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-accent" />
                      Backup Settings
                    </CardTitle>
                    <CardDescription>
                      Configure automatic backups and data retention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-navy-700 font-medium">Automatic Backup</Label>
                        <p className="text-sm text-navy-500">Enable scheduled automatic backups</p>
                      </div>
                      <Switch
                        checked={backupSettings.autoBackup}
                        onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, autoBackup: checked }))}
                      />
                    </div>

                    {backupSettings.autoBackup && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <Select 
                            value={backupSettings.backupFrequency} 
                            onValueChange={(value) => setBackupSettings(prev => ({ ...prev, backupFrequency: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupRetention">Retention Period (days)</Label>
                          <Input
                            id="backupRetention"
                            type="number"
                            value={backupSettings.backupRetention}
                            onChange={(e) => setBackupSettings(prev => ({ ...prev, backupRetention: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="backupLocation">Backup Location</Label>
                      <Input
                        id="backupLocation"
                        value={backupSettings.backupLocation}
                        onChange={(e) => setBackupSettings(prev => ({ ...prev, backupLocation: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-navy-700 font-medium">Remote Backup</Label>
                        <p className="text-sm text-navy-500">Store backups in remote location</p>
                      </div>
                      <Switch
                        checked={backupSettings.remoteBackup}
                        onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, remoteBackup: checked }))}
                      />
                    </div>

                    <div className="bg-navy-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Database className="h-4 w-4 text-navy-600" />
                        <span className="font-medium text-navy-700">Manual Backup</span>
                      </div>
                      <p className="text-sm text-navy-600 mb-3">
                        Create an immediate backup of all system data
                      </p>
                      <div className="flex space-x-3">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Create Backup
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Restore Backup
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-navy-700">Recent Backups</h4>
                      <div className="space-y-2">
                        {[
                          { date: '2024-01-20 02:00:00', size: '245 MB', status: 'success' },
                          { date: '2024-01-19 02:00:00', size: '243 MB', status: 'success' },
                          { date: '2024-01-18 02:00:00', size: '241 MB', status: 'success' }
                        ].map((backup, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                            <div>
                              <p className="text-sm font-medium text-navy-700">{backup.date}</p>
                              <p className="text-xs text-navy-500">{backup.size}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {backup.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}
