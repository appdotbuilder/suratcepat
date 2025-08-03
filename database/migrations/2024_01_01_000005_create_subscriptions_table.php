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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('plan', ['free', 'premium'])->default('free')->comment('Subscription plan type');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active')->comment('Subscription status');
            $table->decimal('amount', 10, 2)->nullable()->comment('Payment amount');
            $table->timestamp('starts_at')->nullable()->comment('Subscription start date');
            $table->timestamp('expires_at')->nullable()->comment('Subscription expiry date');
            $table->text('payment_proof')->nullable()->comment('Payment proof upload path');
            $table->text('notes')->nullable()->comment('Admin notes');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('plan');
            $table->index('status');
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};