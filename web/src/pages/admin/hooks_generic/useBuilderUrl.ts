export interface IOptionsDTO {
  limit: number
  page: number
}

export const useBuilderUrl = (
  uri: string,
  options?: IOptionsDTO,
  querys?: Record<string, any>,
) => {
  let url

  if (options) {
    const searchParams = new URLSearchParams([
      ['limit', String(options.limit)],
      ['page', String(options.page)],
    ])

    if (querys) {
      for (const query in querys) {
        if (querys[query] !== undefined) {
          searchParams.append(query, querys[query])
        }
      }
    }

    url = [uri, searchParams].join('?')
  } else {
    url = uri
  }

  return { url }
}

