<?php

use App\Http\Controllers\GeneratedLetterController;
use App\Http\Controllers\LetterDownloadController;
use App\Http\Controllers\LetterTemplateController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $recentLetters = $user->generatedLetters()
            ->with('letterTemplate')
            ->latest()
            ->limit(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'recentLetters' => $recentLetters,
            'totalLetters' => $user->generatedLetters()->count(),
            'hasPremium' => $user->hasPremiumSubscription(),
        ]);
    })->name('dashboard');

    // Letter templates routes
    Route::get('/templates', [LetterTemplateController::class, 'index'])->name('templates.index');
    Route::get('/templates/{letterTemplate}', [LetterTemplateController::class, 'show'])->name('templates.show');

    // Generated letters routes
    Route::resource('letters', GeneratedLetterController::class)->only(['index', 'store', 'show']);
    
    // Letter download routes
    Route::post('/letters/{generatedLetter}/download', [LetterDownloadController::class, 'store'])->name('letters.download');

    // Subscription routes
    Route::resource('subscription', SubscriptionController::class)->only(['index', 'create', 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
