<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDataContohRequest;
use App\Http\Requests\UpdateDataContohRequest;
use App\Http\Resources\DataContohResource;
use App\Models\DataContoh;
use Illuminate\Http\Request;

class DataContohController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DataContohResource::collection(DataContoh::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDataContohRequest $request)
    {
        $data = $request->validated();
        $mahasiswa = DataContoh::create($data);

        return response(new DataContohResource($mahasiswa) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(DataContoh $mahasiswa)
    {
        return new DataContohResource($mahasiswa);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDataContohRequest $request, DataContoh $mahasiswa)
    {
        $data = $request->validated();
        $mahasiswa->update($data);

        return new DataContohResource($mahasiswa);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(DataContoh $mahasiswa)
    {
        $mahasiswa->delete();

        return response("", 204);
    }
}
