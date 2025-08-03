<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GeneratedLetter;
use App\Services\LetterGeneratorService;

class LetterDownloadController extends Controller
{
    /**
     * Download the generated letter as PDF.
     */
    public function store(GeneratedLetter $generatedLetter)
    {
        // Ensure user owns this letter
        if ($generatedLetter->user_id !== auth()->id()) {
            abort(403);
        }

        $letterService = new LetterGeneratorService();
        return $letterService->downloadAsPdf($generatedLetter);
    }
}