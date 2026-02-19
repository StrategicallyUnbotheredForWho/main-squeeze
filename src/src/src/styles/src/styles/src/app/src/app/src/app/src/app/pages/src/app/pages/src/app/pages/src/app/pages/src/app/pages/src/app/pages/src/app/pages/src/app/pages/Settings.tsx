import { User, Bell, Palette, Info, LogOut, Download } from 'lucide-react';

export default function Settings() {
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          ⚙️ Settings
        </h1>
        <p className="text-gray-600 text-sm">
          Customize your squeeze
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl p-5 mb-4 shadow-md border-2 border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center text-3xl">
            🍋
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-gray-800">Lemon Lover</h2>
            <p className="text-sm text-gray-600">Level 3 • Zest Friend</p>
          </div>
        </div>
        <button className="w-full bg-[var(--color-lemon-light)] text-gray-700 rounded-full py-2 px-4 font-medium text-sm hover:bg-yellow-200 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Settings Groups */}
      <div className="space-y-4 mb-6">
        {/* Account */}
        <SettingsGroup title="Account">
          <SettingItem icon={User} label="Personal Info" />
          <SettingItem icon={Bell} label="Notifications" badge="On" />
        </SettingsGroup>

        {/* Preferences */}
        <SettingsGroup title="Preferences">
          <SettingItem icon={Palette} label="Theme" value="Lemon Yellow" />
        </SettingsGroup>

        {/* App */}
        <SettingsGroup title="App">
          <SettingItem icon={Download} label="Install as App" description="Add to home screen" />
          <SettingItem icon={Info} label="About Main Squeeze" value="v1.0.0" />
        </SettingsGroup>
      </div>

      {/* Logout Button */}
      <button className="w-full bg-red-50 text-red-600 rounded-full py-3 px-6 font-bold border-2 border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
        <LogOut size={18} />
        Log Out
      </button>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Made with 🍋 for solo szn
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2025 Main Squeeze
        </p>
      </div>
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 px-2">{title}</h3>
      <div className="bg-white rounded-3xl shadow-md border-2 border-gray-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function SettingItem({ 
  icon: Icon, 
  label, 
  value, 
  badge,
  description 
}: { 
  icon: any; 
  label: string; 
  value?: string;
  badge?: string;
  description?: string;
}) {
  return (
    <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <Icon size={20} className="text-gray-500" />
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-800 text-sm">{label}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      {value && <span className="text-sm text-gray-500">{value}</span>}
      {badge && (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          {badge}
        </span>
      )}
      <span className="text-gray-400">→</span>
    </button>
  );
}
