<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('generated_letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('letter_template_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Generated letter title');
            $table->json('form_data')->comment('User input data');
            $table->longText('generated_content')->comment('Final letter content');
            $table->string('pdf_path')->nullable()->comment('Path to generated PDF file');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('letter_template_id');
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generated_letters');
    }
};