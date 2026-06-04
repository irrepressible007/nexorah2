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
        Schema::table('testimonials', function (Blueprint $table) {
            $table->renameColumn('company', 'client_company');
            $table->renameColumn('quote', 'review_text');
            $table->integer('rating')->default(5);
            $table->boolean('is_featured')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->renameColumn('client_company', 'company');
            $table->renameColumn('review_text', 'quote');
            $table->dropColumn(['rating', 'is_featured']);
        });
    }
};
