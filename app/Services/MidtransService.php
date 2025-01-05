<?php
namespace App\Services;

use App\Services\Interface\PaymentGatewayInterface;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction as MidtransTransaction;
use Midtrans\Notification;

class MidtransService implements PaymentGatewayInterface
{
    public function __construct()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function createSnapToken(string $orderId, float $amount): string
    {
        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $amount,
            ],
        ];

        return Snap::getSnapToken($params);
    }

    public function cancelTransaction(string $orderId): void
    {
        \Midtrans\Transaction::cancel($orderId);
    }

    public function handleNotification(): \Midtrans\Notification
    {
        return new \Midtrans\Notification();
    }
}
