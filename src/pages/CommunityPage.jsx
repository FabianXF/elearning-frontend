import React from 'react';

const CommunityPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Comunidad</h1>
                <div className="bg-white rounded-lg shadow p-10 text-center">
                    <span className="text-6xl mb-4 block">💬</span>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Foros de Discusión</h2>
                    <p className="text-gray-500">Únete a la conversación en los foros de tus cursos.</p>
                    {/* Future: List active forums here */}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
