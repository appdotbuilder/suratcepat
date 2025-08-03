<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LetterTemplate;
use Inertia\Inertia;

class LetterTemplateController extends Controller
{
    /**
     * Display a listing of available templates.
     */
    public function index()
    {
        $user = auth()->user();
        $templates = $user->getAvailableTemplates();
        $hasPremium = $user->hasPremiumSubscription();
        
        return Inertia::render('letters/templates', [
            'templates' => $templates,
            'hasPremium' => $hasPremium,
        ]);
    }

    /**
     * Show the form for creating a new letter.
     */
    public function show($id)
    {
        $letterTemplate = LetterTemplate::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $user = auth()->user();
        
        // Check if user can access this template
        if ($letterTemplate->is_premium && !$user->hasPremiumSubscription()) {
            return redirect()->route('subscription.index')
                ->with('error', 'This template requires a premium subscription.');
        }

        return Inertia::render('letters/create', [
            'template' => $letterTemplate,
        ]);
    }
}