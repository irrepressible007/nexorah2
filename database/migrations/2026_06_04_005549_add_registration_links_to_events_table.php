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
        Schema::table('events', function (Blueprint $table) {
            $table->string('registration_link')->nullable()->after('status');
            $table->string('ambassador_link')->nullable()->after('registration_link');
            $table->string('volunteer_link')->nullable()->after('ambassador_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['registration_link', 'ambassador_link', 'volunteer_link']);
        });
    }
};
