'use client'
import { useEffect, useState, useMemo } from 'react'
import { CountryI, CountryCodeI } from '@/types/Country.interface'

export const useCountryCodesHook = () => {
  const [countryCodes, setCountryCodes] = useState<CountryCodeI[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const countryOptions = useMemo(() => {
    if (isLoading) return [{ value: 'loading', label: 'Loading...' }]
    return countryCodes.map(code => ({
      value: `${code.label}-${code.value}`, // Use a unique value
      label: code.label,
    }))
  }, [countryCodes, isLoading])

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data: CountryI[] = await response.json()

        const codes = data
          .map((country: CountryI) => {
            const countryCode = country.idd?.root + (country.idd?.suffixes?.[0] || '')
            return {
              value: countryCode,
              label: `${country.name.common} (${countryCode})`,
            }
          })
          .filter((code: CountryCodeI) => code.value)

        const sortedCodes: CountryCodeI[] = codes.sort((a, b) => a.label.localeCompare(b.label))
        setCountryCodes(sortedCodes)
      } catch (error) {
        console.error('Error fetching country codes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCountryCodes()
  }, [])

  return { countryOptions, isLoading }
}
