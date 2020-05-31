<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    //
    protected $fillable = ['name', 'description', 'agent'];

    public function agents(){
        return $this->hasMany('App\Agent');
    }
}
