<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        $products->transform(function ($item, $key) {
            $file_id = $item['file'];
            $item['file'] = File::find($file_id);
            return $item;
        });

        return response()->json(['products'=> $products], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file_id = false;
        // Сохранение файла
        if ($request->file) {
            $file = $request->file;
            $name = time().'.' . $file->hashName();
            $path = public_path('uploads/').$name;
            $file->move('uploads', $name);

            $f = new File([
                'name' => $name,
                'src' => $path
            ]);
            $f->save();

            $file_id = $f->id;
        }

        $product = new Product([
            'name' => $request->name,
            'description' => $request->description,
            'detail_description' => $request->detail_description,
        ]);

        if ($file_id) {
            $product->file = $file_id;
        }
        $product->save();

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $product = Product::find($id);
        if ($product->delete()) {
            return response()->json(['msg' => 'Продукт был успешно удален из базы данных'], 200);
        }

        return response()->json(null, 204);
    }
}
