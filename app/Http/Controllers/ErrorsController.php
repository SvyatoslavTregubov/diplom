<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Error;

class ErrorsController extends Controller
{
    public function filter($status)
    {
        return response()->json(array('errors' => Error::where('status','=', $status)->get()), 200);
    }

    public function index()
    {
        return response()->json(array('errors' => Error::all()), 200);
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
            $error->status = $request->status;
            $error->save();
        }

        return response()->json($error, 203);
    }

}
