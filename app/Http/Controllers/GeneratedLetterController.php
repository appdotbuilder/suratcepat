<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGeneratedLetterRequest;
use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
use App\Services\LetterGeneratorService;
use Inertia\Inertia;

class GeneratedLetterController extends Controller
{
    /**
     * Display a listing of user's generated letters.
     */
    public function index()
    {
        $letters = auth()->user()
            ->generatedLetters()
            ->with('letterTemplate')
            ->latest()
            ->paginate(10);

        return Inertia::render('letters/history', [
            'letters' => $letters,
        ]);
    }

    /**
     * Store a newly generated letter.
     */
    public function store(StoreGeneratedLetterRequest $request)
    {
        $user = auth()->user();
        $template = LetterTemplate::findOrFail($request->letter_template_id);

        // Check if user can access this template
        if ($template->is_premium && !$user->hasPremiumSubscription()) {
            return back()->with('error', 'This template requires a premium subscription.');
        }

        $letterService = new LetterGeneratorService();
        $generatedContent = $letterService->generateLetter($template, $request->form_data);

        $letter = GeneratedLetter::create([
            'user_id' => $user->id,
            'letter_template_id' => $template->id,
            'title' => $request->title,
            'form_data' => $request->form_data,
            'generated_content' => $generatedContent,
        ]);

        return Inertia::render('letters/preview', [
            'letter' => $letter->load('letterTemplate'),
        ]);
    }

    /**
     * Display the specified generated letter.
     */
    public function show(GeneratedLetter $generatedLetter)
    {
        // Ensure user owns this letter
        if ($generatedLetter->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('letters/preview', [
            'letter' => $generatedLetter->load('letterTemplate'),
        ]);
    }


}