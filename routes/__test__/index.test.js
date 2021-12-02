const app=require('../../app');
const request=require('supertest');

describe('register',()=>{
it('return status code 201 if firstName is passed',async ()=>{
    const res=await request(app).post('/register').send({firstName:'Jan'});

    expect(res.statusCode).toEqual(201);
});

it('return bad request',async ()=>{
    const res=await request(app).post('/register').send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual('sada');
});

});