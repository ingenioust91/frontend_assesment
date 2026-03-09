import { useEffect, useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

type province = {
  id : number,
  name : string
}

type regency = {
  id : number,
  name : string,
  province_id : number
}

type district = {
  id : number,
  name : string,
  regency_id : number
}

export function Welcome() {
  const [province, setProvince] = useState<province[]>([])
  const [selectedProv, setSelectedProv] = useState<string>('')
  const [regency, setRegency] = useState<regency[]>([])
  const [selectedReg, setSelectedReg] = useState<string>('')
  const [district, setDistrict] = useState<district[]>([])
  const [selectedDis, setSelectedDis] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(()=>{
    setLoading(false)
    setError('')
    async function loadProvince() {
      setLoading(true)
      try{
        const response = await fetch('/data/provinces.json')
        const result = await response.json()
        setProvince(result)
      }catch(e : any){
        setError(e.message)
      }finally{setLoading(false)}
    }
    loadProvince()
    
  },[])

  useEffect(()=>{
    setLoading(false)
    setError('')
    if (!selectedProv) return
    async function loadRegencies() {
      setLoading(true)
      try{
        const response = await fetch('/data/regencies.json')
        const result = await response.json()
        const filteredResult = result.filter((r : regency)=>r.province_id == parseInt(selectedProv))
        setRegency(filteredResult)
      }catch(e : any){
        setError(e.message)
      }finally{setLoading(false)}
    }
    loadRegencies()
  },[selectedProv])

  useEffect(()=>{
    setLoading(false)
    setError('')
    if (!selectedReg) return
    async function loadDistricts() {
      setLoading(true)
      try{
        const response = await fetch('/data/districts.json')
        const result = await response.json()
        const filteredResult = result.filter((d : district)=>d.regency_id == parseInt(selectedReg))
        setDistrict(filteredResult)
                console.log('REG',selectedReg)
      }catch(e : any){
        setError(e.message)
      }finally{setLoading(false)}
    }
    loadDistricts()
  },[selectedReg])

  function reset(){
    setSelectedDis('')
    setSelectedProv('')
    setSelectedReg('')
  }

  return (
    <main className="flex h-screen">
      <section className="bg-gray-100 w-[30%] h-full border-r-2 border-gray-200">
        <div className="flex gap-4 flex-col p-10">
          <div className="flex justify-center gap-2 items-center mb-5">
            <img className="w-10 p-2 bg-blue-100 rounded-xl" src='/globe.png'/>
            <p className="font-bold text-lg">Frontend Assesment</p>
          </div>
          <p className="font-bold text-sm tracking-widest text-gray-400">FILTER WILAYAH</p>
          <form className="flex flex-col gap-4 w-full">
          {/*-------- PROVINCE --------*/}
            <div className="w-full"> 
              <p className="text-gray-500 font-bold tracking-wider mb-2">PROVINSI</p>
              <div className="flex items-center gap-2 px-4 py-3 border border-gray-500 rounded-xl">
              <img className="w-5" src="/province.png" />

              <select value={selectedProv}
                      onChange={(e)=>setSelectedProv(e.target.value)} className="flex-1 text-gray-800 outline-none bg-transparent">
                <option value="" disabled hidden>Pilih Provinsi</option>
                {province && province.map((p)=>
                  <option key={p.id} value={p.id} >{p.name}</option>)}
              </select>

            </div>
            </div>

          {/*-------- REGENCY --------*/}
            <div className="w-full"> 
              <p className="text-gray-500 font-bold tracking-wider mb-2">KOTA/KABUPATEN</p>
              <div className="flex items-center gap-2 px-4 py-3 border border-gray-500 rounded-xl">
              <img className="w-5" src="/city.png" />

              <select value={selectedReg}
                      onChange={(e)=>setSelectedReg(e.target.value)} className="flex-1 text-gray-800 outline-none bg-transparent">
                <option value="" disabled hidden>Pilih Kota/Kabupaten</option>
                {regency && regency.map((r)=>
                  <option key={r.id} value={r.id} >{r.name}</option>)}
              </select>

            </div>
            </div>

          {/*-------- DISTRICT --------*/}
            <div className="w-full"> 
              <p className="text-gray-500 font-bold tracking-wider mb-2">KECAMATAN</p>
              <div className="flex items-center gap-2 px-4 py-3 border border-gray-500 rounded-xl">
              <img className="w-5" src="/district.png" />

              <select value={selectedDis}
                      onChange={(e)=>setSelectedDis(e.target.value)} className="flex-1 text-gray-800 outline-none bg-transparent">
                <option value="" disabled hidden>Pilih Kecamatan</option>
                {district && district.map((d)=>
                  <option key={d.id} value={d.id} >{d.name}</option>)}
              </select>

            </div>
            </div>

            <hr className="mt-5 border-1 border-gray-200"/>
            
            <button onClick={()=>reset()} className="mt-5 text-gray-500 font-bold tracking-wider py-3.5 rounded-xl border-1 border-blue-500">RESET</button>
          </form>
        </div>
      </section>

      <section className="flex flex-col w-[70%] h-screen">
        {/* ----BREADCRUMB---- */}
        <section className="h-[10%] flex text-sm text-blue-500 gap-5 border-b-2 border-gray-200 p-5">
            <p>Indonesia</p>

            {province.filter((p)=>p.id == parseInt(selectedProv)).map((p)=>
              <><p>›</p>
              <p>{p.name}</p>
              </>
            )}


            {selectedReg && regency.filter((r)=>r.id == parseInt(selectedReg)).map((r)=>
              <><p>›</p>
              <p>{r.name}</p>
              </>
            )}

            {selectedDis && district.filter((d)=>d.id == parseInt(selectedDis)).map((d)=>
              <><p>›</p>
              <p>{d.name}</p>
              </>
            )}

        </section>

        {/* ----CONTENT---- */}
        <section className="bg-gray-100 h-[90%] flex gap-10 flex-col w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-blue-500 tracking-widest">PROVINSI</p>
            {province.filter((p)=>p.id == parseInt(selectedProv)).map((p)=>
              <p className="text-5xl font-bold text-gray-900">{p.name}</p>
            )}
          </div>
          <p className="text-gray-200 text-3xl">↓</p>

          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-blue-500 tracking-widest">KOTA/KABUPATEN</p>
            {selectedReg && regency.filter((r)=>r.id == parseInt(selectedReg)).map((r)=>
              <p className="text-4xl font-bold text-gray-900">{r.name}</p>
            )}
          </div>
          <p className="text-gray-200 text-3xl">↓</p>

          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-blue-500 tracking-widest">KECAMATAN</p>
            {selectedDis && district.filter((d)=>d.id == parseInt(selectedDis)).map((d)=>
              <p className="text-3xl font-bold text-gray-900">{d.name}</p>
            )}
          </div>

        </section>
      </section>
    </main>
  );
}


