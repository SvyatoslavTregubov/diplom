<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Error;
use App\Product;

class ErrorsController extends Controller
{
    public function filter($status)
    {
        $errors = Error::where('status','=', $status)->get();
        $errors->transform(function ($item, $key) {
            $machine_id = $item['machine'];
            $item['machine'] = Product::find($machine_id);
            return $item;
        });

        return response()->json(array('errors' => $errors), 200);
    }

    public function index()
    {
        $errors = Error::all();
        $errors->transform(function ($item, $key) {
            $machine_id = $item['machine'];
            $item['machine'] = Product::find($machine_id);
            return $item;
        });

        return response()->json(array('errors' => $errors), 200);
    }

    public function store(Request $request)
    {
        $error = new Error();

        $error->name = $request->name;
        $error->machine = $request->machine;
        $error->status = false;

        $error->save();

        return response()->json($error, 201);
    }

    public function update(Request $request) {
        $error = Error::findOrFail($request->id);

        if (isset($request->status)) {
            //var_dump($request->status);
            $error->status = $request->status == 1? 0: 1;
            $error->save();
        }
        $machine_id = $error->machine;
        $error->machine = Product::find($machine_id);


        return response()->json($error, 203);
    }

}
