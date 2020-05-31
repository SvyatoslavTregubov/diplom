<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    //
    protected $fillable = ['name', 'phone', 'email'];

    public function company() {
        return $this->belongsTo('App\Clients');
    }
}
