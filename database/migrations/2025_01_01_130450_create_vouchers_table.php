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
            $table->string('name');
            $table->string('code')->unique();
            $table->enum('type', ['percent', 'redeem', 'amount']);
            $table->integer('value')->nullable();
            $table->integer('limit')->nullable();
            $table->integer('used')->default(0);
            $table->dateTime('expired_at');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE vouchers ADD CONSTRAINT check_voucher_requirements CHECK (
            (type = "redeem" AND subscriptions_plans_id IS NOT NULL) OR 
            ((type = "percent" OR type = "amount") AND value IS NOT NULL)
        )');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
