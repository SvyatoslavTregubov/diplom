<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = ['name', 'description', 'detail_description', 'file'];

    public function files(){
        return $this->hasMany('App\File');
    }
}
