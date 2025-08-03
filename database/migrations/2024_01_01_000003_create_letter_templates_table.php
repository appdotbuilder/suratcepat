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
        Schema::create('letter_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Template name');
            $table->string('slug')->unique()->comment('URL-friendly template identifier');
            $table->text('description')->comment('Template description');
            $table->json('fields')->comment('Form fields configuration');
            $table->longText('template_content')->comment('Letter template with placeholders');
            $table->boolean('is_premium')->default(false)->comment('Requires premium subscription');
            $table->boolean('is_active')->default(true)->comment('Template availability status');
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('is_premium');
            $table->index('is_active');
            $table->index(['is_active', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_templates');
    }
};