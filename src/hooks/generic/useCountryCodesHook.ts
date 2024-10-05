'use client'

import { useEffect, useState } from 'react'

import { CountryI, CountryCodeI } from '@/types/Country.interface'

export const useCountryCodesHook = () => {
  const [countryCodes, setCountryCodes] = useState<CountryCodeI[]>([]) // Corrected type for state
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data: CountryI[] = await response.json()

        // Map the response to get necessary fields
        const codes = data
          .map((country: CountryI) => ({
            value: country.idd?.root + (country.idd?.suffixes?.[0] || ''),
            label: `${country.name.common} (${country.idd?.root + (country.idd?.suffixes?.[0] || '')})`,
          }))
          .filter((code: CountryCodeI) => code.value) // Filter out entries without country codes

        // Sort by country name (label) in ascending order
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

  return { countryCodes, isLoading }
}
