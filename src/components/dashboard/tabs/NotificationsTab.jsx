export default function NotificationsTab() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <h2 className="text-2xl font-bold text-midnight-blue px-2 pt-4">Notifications</h2>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-start space-x-4 border border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-midnight-blue">Bienvenue au Fab Lab !</p>
            <p className="text-sm text-midnight-blue/60">Votre compte a été créé avec succès. Explorez nos outils.</p>
            <p className="text-[10px] text-midnight-blue/40 mt-1">Il y a 2 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
