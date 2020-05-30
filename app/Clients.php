<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    //

    public function agents(){
        return $this->hasMany('App\Agent');
    }
}
