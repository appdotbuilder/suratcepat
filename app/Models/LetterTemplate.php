<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\LetterTemplate
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property array $fields
 * @property string $template_content
 * @property bool $is_premium
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GeneratedLetter> $generatedLetters
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereIsPremium($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereTemplateContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate active()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate free()
 * @method static \Illuminate\Database\Eloquent\Builder|LetterTemplate premium()
 * @method static \Database\Factories\LetterTemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class LetterTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'fields',
        'template_content',
        'is_premium',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fields' => 'array',
        'is_premium' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the generated letters for this template.
     */
    public function generatedLetters(): HasMany
    {
        return $this->hasMany(GeneratedLetter::class);
    }

    /**
     * Scope a query to only include active templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include free templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFree($query)
    {
        return $query->where('is_premium', false);
    }

    /**
     * Scope a query to only include premium templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePremium($query)
    {
        return $query->where('is_premium', true);
    }
}