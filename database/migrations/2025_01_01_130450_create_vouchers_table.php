<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscriptions_plans_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('code')->unique();
            $table->enum('type', ['percent', 'redeem', 'amount']);
            $table->integer('value');
            $table->integer('limit')->nullable();
            $table->integer('used')->default(0);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE vouchers ADD CONSTRAINT check_redeem_subscriptions_plans_id CHECK (type != "redeem" OR subscriptions_plans_id IS NOT NULL)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
