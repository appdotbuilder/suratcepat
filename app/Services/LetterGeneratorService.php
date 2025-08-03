<?php

namespace App\Services;

use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
// use Barryvdh\DomPDF\Facade\Pdf; // Will be implemented when package is available
use Illuminate\Http\Response;

class LetterGeneratorService
{
    /**
     * Generate letter content by replacing placeholders with user data.
     *
     * @param LetterTemplate $template
     * @param array $formData
     * @return string
     */
    public function generateLetter(LetterTemplate $template, array $formData): string
    {
        $content = $template->template_content;

        // Replace placeholders with actual data
        foreach ($formData as $key => $value) {
            $placeholder = '{' . $key . '}';
            $content = str_replace($placeholder, $value, $content);
        }

        // Add current date if needed
        $content = str_replace('{current_date}', now()->format('d F Y'), $content);
        $content = str_replace('{current_date_id}', now()->locale('id')->format('d F Y'), $content);

        return $content;
    }

    /**
     * Download generated letter as PDF.
     *
     * @param GeneratedLetter $letter
     * @return Response
     */
    public function downloadAsPdf(GeneratedLetter $letter): Response
    {
        // For now, return the content as a text file
        // TODO: Implement PDF generation when DomPDF package is available
        $filename = str_replace(' ', '_', $letter->title) . '_' . $letter->created_at->format('Y-m-d') . '.txt';
        
        return response($letter->generated_content)
            ->header('Content-Type', 'text/plain')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }


}