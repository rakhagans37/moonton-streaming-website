<?php

namespace App\Services\Interface;

interface PaymentGatewayInterface
{
    public function createSnapToken(string $orderId, float $amount): string;
    public function cancelTransaction(string $orderId): void;
    public function handleNotification(): \Midtrans\Notification;
}