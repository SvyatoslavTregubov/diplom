<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth',
], function(){
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function(){
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::resource('clients', 'ClientsController')->middleware('auth:api');
Route::resource('agents', 'AgentsController')->middleware('auth:api');
Route::resource('machines', 'ProductController')->middleware('auth:api');

Route::group([
    'middleware' => 'auth:api'
], function(){
    Route::get('errors', 'ErrorsController@index');
    Route::get('errors/{status}', 'ErrorsController@filter');
    Route::put('errors', 'ErrorsController@store');
    Route::post('errors', 'ErrorsController@update');
});
