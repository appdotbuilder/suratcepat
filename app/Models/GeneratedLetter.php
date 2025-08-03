<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GeneratedLetter
 *
 * @property int $id
 * @property int $user_id
 * @property int $letter_template_id
 * @property string $title
 * @property array $form_data
 * @property string $generated_content
 * @property string|null $pdf_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\LetterTemplate $letterTemplate
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter query()
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereFormData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereGeneratedContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereLetterTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter wherePdfPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GeneratedLetter whereUserId($value)
 * @method static \Database\Factories\GeneratedLetterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GeneratedLetter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'letter_template_id',
        'title',
        'form_data',
        'generated_content',
        'pdf_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'form_data' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the generated letter.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the letter template used for this generated letter.
     */
    public function letterTemplate(): BelongsTo
    {
        return $this->belongsTo(LetterTemplate::class);
    }
}