# 404 Redirect Fix List -- Empathy Health Clinic

These URLs were breaking after the GitHub/Vercel migration and should be
redirected.

## Broken URLs → Correct Pages

-   `/cigna-cigna-coverage` → `/psychiatrist-orlando-accepts-cigna`
-   `/aetna-aetna-coverage` → `/psychiatrist-orlando-accepts-aetna`
-   `/medicare-medicare-coverage` →
    `/psychiatrist-orlando-accepts-medicare`
-   `/united-united-coverage` →
    `/psychiatrist-orlando-accepts-united-healthcare`
-   `/bcbs-bcbs-coverage` → `/blue-cross-blue-shield-therapy-orlando`

## Vercel Redirect Format Example

``` json
{
  "source": "/cigna-cigna-coverage",
  "destination": "/psychiatrist-orlando-accepts-cigna",
  "permanent": true
}
```

Add these into `vercel.json` under `redirects`.

------------------------------------------------------------------------

Purpose: restore Google Ads URLs, eliminate 404s, and preserve SEO
authority.
